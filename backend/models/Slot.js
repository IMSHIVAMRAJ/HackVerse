const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  status: { type: String, enum: ['available','pending','booked','cancelled'], default: 'available' },
  pendingUntil: { type: Date } // used if status pending during payment
}, { timestamps: true });

SlotSchema.index({ mentor: 1, start: 1 }, { unique: true });

module.exports = mongoose.model('Slot', SlotSchema);
