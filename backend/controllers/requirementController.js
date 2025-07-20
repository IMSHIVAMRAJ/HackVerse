const Requirement = require("../models/requirementModel");

// @desc Create new requirement
exports.createRequirement = async (req, res) => {
  const {
    teamname,
    currentMembers,
    requiredMembers,
    linkdeinProfile,
    email,
    message,
    skillsNeeded,
    domain,
    expiryDate,
  } = req.body;

  try {
    const requirement = await Requirement.create({
      // this line creates a new requirement in the database using the Requirement model. It takes the data from the request body and the user ID from req.user._id.
      type: "team",
      postedBy: req.user._id,
      teamname,
      currentMembers,
      requiredMembers,
      linkdeinProfile,
      email,
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
// exports.getAllRequirements = async (req, res) => {
//   const requirements = await Requirement.find({ expiryDate: { $gt: Date.now() } }).populate('postedBy', 'name linkedin');
//   res.json(requirements);
// };

// @desc Get all team requirements
// Get all team requirements - without type filter
exports.getTeamRequirements = async (req, res) => {
  const teams = await Requirement.find({
    expiryDate: { $gt: Date.now() },
  }).populate("postedBy", "name linkedin");
  res.json(teams);
};

// @desc Get all member requirements
// exports.getMemberRequirements = async (req, res) => {
//   const members = await Requirement.find({ type: 'member', expiryDate: { $gt: Date.now() } }).populate('postedBy', 'name linkedin');
//   res.json(members);
// };
// Get requirements created by the logged-in user
exports.getMyRequirements = async (req, res) => {
  try {
    console.log("Logged-in user ID:", req.user._id); // Debug

    const myRequirements = await Requirement.find({
      postedBy: req.user._id, // ✅ Proper ObjectId matching
    });

    res.json(myRequirements);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your requirements", error });
  }
};



// Update a specific requirement
exports.updateRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({ message: "Requirement not found" });
    }

    if (requirement.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to edit this requirement" });
    }

    const updated = await Requirement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update requirement", error });
  }
};

// Delete a specific requirement
exports.deleteRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({ message: "Requirement not found" });
    }

    if (requirement.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this requirement" });
    }

    // Corrected line
    await requirement.deleteOne();

    res.json({ message: "Requirement deleted successfully" });
  } catch (error) {
    // It's good practice to log the actual error on the server for debugging
    console.error(error); 
    res.status(500).json({ message: "Failed to delete requirement", error: error.message });
  }
};
