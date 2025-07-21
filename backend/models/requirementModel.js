const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
  type: { type: String, enum: ['team'], default: 'team' },

  // type: { type: String, enum: ['team', 'member'], required: true }, //enum: ['team', 'member'], required: true }, // this line defines the type of requirement, which can either be 'team' or 'member'.
  teamname: { type: String }, // this line defines the name of the team for team requirements.
  currentMembers: { type: Number, default: 0 }, // this line defines the
  requiredMembers: { type: Number, default: 0 }, // this line defines the number of required members for team requirements.
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  skillsNeeded: [{ type: String }],
  linkedinProfile: { type: String }, // this line defines the LinkedIn profile of the person posting the requirement.
  email: { type: String }, // this line defines the email of the person posting the requirement.
  domain: { type: String },
  expiryDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Requirement', requirementSchema);
