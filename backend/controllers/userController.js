const User = require('../models/userModel');

// @desc Get user profile
exports.getProfile = async (req, res) => { // this function retrieves the user profile from the database using the user ID stored in req.user._id. It then sends the user data as a JSON response.
  res.json(req.user);
};

// @desc Update user profile
exports.updateProfile = async (req, res) => { //
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name; // this line updates the user's name if a new name is provided in the request body, otherwise it keeps the existing name.
    user.profilePic = req.body.profilePic || user.profilePic;
    user.skills = req.body.skills || user.skills;
    user.github = req.body.github || user.github;
    user.linkedin = req.body.linkedin || user.linkedin;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
