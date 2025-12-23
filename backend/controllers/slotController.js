const asyncHandler = require('express-async-handler');
const Slot = require('../models/Slot');
const Mentor = require('../models/Mentor');

exports.createSlot = asyncHandler(async (req, res) => {
  const { mentorId, start, end } = req.body;
  const mentor = await Mentor.findById(mentorId);
  if (!mentor) { res.status(404); throw new Error('Mentor not found'); }
  const slot = await Slot.create({ mentor: mentorId, start, end });
  res.status(201).json(slot);
});

exports.getSlotsForMentor = asyncHandler(async (req, res) => {
  const { mentorId } = req.params;
  const slots = await Slot.find({ mentor: mentorId, status: { $in: ['available','pending'] }, start: { $gte: new Date() } }).sort({ start: 1 });
  res.json(slots);
});

// Mentor cancel slot
exports.updateSlotStatus = asyncHandler(async (req, res) => {
  const slot = await Slot.findById(req.params.id);
  if (!slot) { res.status(404); throw new Error('Slot not found'); }
  slot.status = req.body.status || slot.status;
  slot.pendingUntil = req.body.pendingUntil || slot.pendingUntil;
  await slot.save();
  res.json(slot);
});
