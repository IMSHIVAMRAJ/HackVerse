// models/Mentor.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  bio: { type: String },
  expertise: [{ type: String }],
  photoUrl: { type: String },
  fee: { type: Number, default: 50000 }, // in paise
  currency: { type: String, default: 'INR' },
  meetingPreference: { type: String, enum: ['mentor_link','auto_zoom','auto_gmeet'], default: 'mentor_link' },
  personalMeetingLink: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// hash password before save
MentorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// method to compare password
MentorSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Mentor', MentorSchema);
