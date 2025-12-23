// middlewares/mentorAuth.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Mentor = require('../models/Mentor');

exports.mentorProtect = asyncHandler(async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    token = auth.split(' ')[1];
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized as mentor, token missing');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.type !== 'mentor') {
      res.status(401);
      throw new Error('Invalid mentor token');
    }
    const mentor = await Mentor.findById(decoded.id).select('-password');
    if (!mentor) {
      res.status(401);
      throw new Error('Mentor not found');
    }
    req.mentor = { id: mentor._id };
    next();
  } catch (err) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});
