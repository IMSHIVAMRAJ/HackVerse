// controllers/mentorAuthController.js
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Mentor = require('../models/Mentor');

// util: sign token
const signToken = (mentorId) => {
  return jwt.sign({ id: mentorId, type: 'mentor' }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// POST /api/mentors/auth/register
exports.registerMentor = asyncHandler(async (req, res) => {
  const { name, email, password, bio, expertise = [], photoUrl, fee, personalMeetingLink } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email and password are required');
  }

  const existing = await Mentor.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error('Mentor with this email already exists');
  }

  const mentor = await Mentor.create({
    name, email, password, bio, expertise, photoUrl, fee, personalMeetingLink
  });

  if (!mentor) {
    res.status(500);
    throw new Error('Failed to create mentor');
  }

  res.status(201).json({
    _id: mentor._id,
    name: mentor.name,
    email: mentor.email,
    token: signToken(mentor._id)
  });
});

// POST /api/mentors/auth/login
exports.loginMentor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Provide email and password');
  }

  const mentor = await Mentor.findOne({ email });
  if (!mentor) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const isMatch = await mentor.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  res.json({
    _id: mentor._id,
    name: mentor.name,
    email: mentor.email,
    token: signToken(mentor._id)
  });
});

// GET /api/mentors/auth/me
exports.getMentorProfile = asyncHandler(async (req, res) => {
  // mentorProtect sets req.mentor
  const mentor = await Mentor.findById(req.mentor.id).select('-password');
  if (!mentor) {
    res.status(404);
    throw new Error('Mentor not found');
  }
  res.json(mentor);
});
