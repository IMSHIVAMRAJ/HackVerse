const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  amount: { type: Number, required: true }, // paise
  currency: { type: String, default: 'INR' },
  paymentProvider: { type: String }, // razorpay, stripe
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  paymentStatus: { type: String, enum: ['pending','paid','failed','refunded'], default: 'pending' },
  meetingLink: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
