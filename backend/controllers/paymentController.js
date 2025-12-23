// controllers/paymentController.js
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const Slot = require('../models/Slot');
const Mentor = require('../models/Mentor');
const Booking = require('../models/Booking');

function getRazorpayInstance() {
  const Razorpay = require('razorpay'); // require here (lazy)
  const key_id = process.env.RZP_KEY_ID;
  const key_secret = process.env.RZP_KEY_SECRET;

  if (!key_id || !key_secret) {
    // DON'T throw here (would crash require). Instead return null and handle upstream.
    console.error('Razorpay keys missing: set RZP_KEY_ID and RZP_KEY_SECRET in .env');
    return null;
  }

  return new Razorpay({ key_id, key_secret });
}

// Create Razorpay order -> lock slot pending -> create pending Booking
exports.createRazorpayOrder = asyncHandler(async (req, res) => {
  const { userId, mentorId, slotId } = req.body;
  if (!userId || !mentorId || !slotId) {
    return res.status(400).json({ message: 'userId, mentorId and slotId required' });
  }

  const razorpay = getRazorpayInstance();
  if (!razorpay) {
    return res.status(500).json({ message: 'Payment gateway not configured on server. Contact admin.' });
  }

  const mentor = await Mentor.findById(mentorId);
  if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

  // Atomic: set slot to pending if available
  const pendingUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  const slot = await Slot.findOneAndUpdate(
    { _id: slotId, status: 'available' },
    { $set: { status: 'pending', pendingUntil } },
    { new: true }
  );
  if (!slot) {
    return res.status(409).json({ message: 'Slot not available' });
  }

  const amount = mentor.fee; // in paise
  const options = {
    amount: amount,
    currency: mentor.currency || 'INR',
    receipt: `booking_${mentorId}_${slotId}_${Date.now()}`,
    payment_capture: 1
  };

  const order = await razorpay.orders.create(options);

  // Create pending booking
  const booking = await Booking.create({
    user: userId,
    mentor: mentorId,
    slot: slotId,
    start: slot.start,
    end: slot.end,
    amount,
    currency: mentor.currency || 'INR',
    paymentProvider: 'razorpay',
    razorpayOrderId: order.id,
    paymentStatus: 'pending'
  });

  res.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    bookingId: booking._id,
    keyId: process.env.RZP_KEY_ID
  });
});

// Razorpay webhook handler (raw body expected by route)
exports.razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RZP_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    const body = req.body; // raw buffer (route must use bodyParser.raw)

    if (!secret) {
      console.error('RZP_WEBHOOK_SECRET not set in .env');
      return res.status(500).send('webhook secret not configured');
    }

    // verify signature
    const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');
    if (signature !== expectedSignature) {
      console.warn('Invalid webhook signature');
      return res.status(400).send('invalid signature');
    }

    const payload = JSON.parse(body.toString());
    const event = payload.event;

    if (event === 'payment.captured' || (payload.payload?.payment?.entity?.status === 'captured')) {
      const razorpayPaymentEntity = payload.payload?.payment?.entity;
      const razorpayOrderId = razorpayPaymentEntity?.order_id;
      const razorpayPaymentId = razorpayPaymentEntity?.id;

      const booking = await Booking.findOne({ razorpayOrderId });
      if (!booking) {
        console.warn('No booking found for order', razorpayOrderId);
        return res.status(200).send('no booking');
      }

      if (booking.paymentStatus === 'paid') {
        return res.status(200).send('already processed');
      }

      booking.paymentStatus = 'paid';
      booking.razorpayPaymentId = razorpayPaymentId;
      await booking.save();

      const slot = await Slot.findById(booking.slot);
      if (slot) {
        slot.status = 'booked';
        slot.pendingUntil = undefined;
        await slot.save();
      }

      const mentor = await Mentor.findById(booking.mentor);
      booking.meetingLink = mentor?.personalMeetingLink || '';
      await booking.save();

      // TODO: send notification emails here

      return res.status(200).send('ok');
    }

    res.status(200).send('ignored');
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).send('error');
  }
};
