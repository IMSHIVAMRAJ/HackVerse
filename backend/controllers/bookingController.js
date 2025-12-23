const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const Mentor = require('../models/Mentor');

exports.getBookingsForUser = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('mentor slot');
  res.json(bookings);
});

exports.getBookingsForMentor = asyncHandler(async (req, res) => {
  const mentorId = req.params.mentorId;
  const bookings = await Booking.find({ mentor: mentorId }).populate('user slot').sort({ createdAt: -1 });
  res.json(bookings);
});

// Optional: create booking endpoint (if you want server-side without webhook) - not recommended
exports.createBooking = asyncHandler(async (req, res) => {
  const { userId, mentorId, slotId, amount } = req.body;
  const slot = await Slot.findById(slotId);
  if (!slot) { res.status(404); throw new Error('Slot not found'); }
  // Lock slot atomically
  const locked = await Slot.findOneAndUpdate({ _id: slotId, status: 'available' }, { $set: { status: 'booked' } }, { new: true });
  if (!locked) { res.status(409); throw new Error('Slot already booked'); }
  const booking = await Booking.create({
    user: userId, mentor: mentorId, slot: slotId, start: slot.start, end: slot.end, amount, paymentStatus: 'paid', paymentProvider: 'manual'
  });
  res.status(201).json(booking);
});
