const Requirement = require('../models/requirementModel');

// @desc Create new requirement
exports.createRequirement = async (req, res) => {
  const { type, message, skillsNeeded, domain, expiryDate } = req.body;

  try {
    const requirement = await Requirement.create({ // this line creates a new requirement in the database using the Requirement model. It takes the data from the request body and the user ID from req.user._id.
      type,
      postedBy: req.user._id,
      message,
      skillsNeeded,
      domain,
      expiryDate,
    });
    
    res.status(201).json(requirement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all requirements
exports.getAllRequirements = async (req, res) => {
  const requirements = await Requirement.find({ expiryDate: { $gt: Date.now() } }).populate('postedBy', 'name linkedin');
  res.json(requirements);
};

// @desc Get all team requirements
exports.getTeamRequirements = async (req, res) => {
  const teams = await Requirement.find({ type: 'team', expiryDate: { $gt: Date.now() } }).populate('postedBy', 'name linkedin');
  res.json(teams);
};

// @desc Get all member requirements
exports.getMemberRequirements = async (req, res) => {
  const members = await Requirement.find({ type: 'member', expiryDate: { $gt: Date.now() } }).populate('postedBy', 'name linkedin');
  res.json(members);
};
