const asyncHandler = require('express-async-handler');
const Mentor = require('../models/Mentor');

exports.createMentor = asyncHandler(async (req, res) => {
  const { name, email, bio, expertise, photoUrl, fee, personalMeetingLink } = req.body;
  const mentor = await Mentor.create({
    name, email, bio, expertise, photoUrl, fee, personalMeetingLink,
    user: req.user?.id
  });
  res.status(201).json(mentor);
});

exports.getMentors = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const filter = q ? { $text: { $search: q } } : {};
  const mentors = await Mentor.find(filter).lean();
  res.json(mentors);
});

exports.getMentor = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);
  if (!mentor) {
    res.status(404);
    throw new Error('Mentor not found');
  }
  res.json(mentor);
});

exports.updateMentor = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);
  if (!mentor) { res.status(404); throw new Error('No mentor'); }
  Object.assign(mentor, req.body);
  await mentor.save();
  res.json(mentor);
});
