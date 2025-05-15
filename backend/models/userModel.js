const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  skills: [{ type: String }],
  github: { type: String },
  linkedin: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
