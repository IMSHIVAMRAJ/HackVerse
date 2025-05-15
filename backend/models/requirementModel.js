const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
  type: { type: String, enum: ['team', 'member'], required: true }, //enum: ['team', 'member'], required: true }, // this line defines the type of requirement, which can either be 'team' or 'member'.
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  skillsNeeded: [{ type: String }],
  domain: { type: String },
  expiryDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Requirement', requirementSchema);
