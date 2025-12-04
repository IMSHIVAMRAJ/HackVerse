const User = require('../models/userModel');
const cloudinary = require('../config/cloudinary');
const streamifier = require("streamifier");
// @desc Get user profile
exports.getProfile = async (req, res) => { // this function retrieves the user profile from the database using the user ID stored in req.user._id. It then sends the user data as a JSON response.
  res.json(req.user);
};

// @desc Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 👇 Upload image to cloudinary if file exists
    let imageUrl = user.profilePic;

    if (req.file) {
      const uploadFromBuffer = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "user-profiles" },
            (error, result) => {
              if (error) return reject(error);
              return resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await uploadFromBuffer();
      imageUrl = result.secure_url;
    }

    // 📝 Update fields
    user.name = req.body.name || user.name;
    user.profilePic = imageUrl;
    user.skills = req.body.skills || user.skills;
    user.github = req.body.github || user.github;
    user.linkedin = req.body.linkedin || user.linkedin; // Typo fix from `linkedein`

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Failed to update profile", error });
  }
};

exports.getWantTeamMembers = async (req, res) => {
  try {
    const users = await User.find({ wantTeam: true })
      .select('name contact email linkedin skills profilePic designation areaOfSpecialization membershipType createdAt');
    res.json(users);
  } catch (error) {
    console.error("Get want-team members error:", error);
    res.status(500).json({ message: "Failed to fetch want-team members", error: error.message });
  }
};

exports.toggleWantTeam = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (typeof req.body.wantTeam === 'boolean') {
      user.wantTeam = req.body.wantTeam;
    } else {
      user.wantTeam = !user.wantTeam;
    }

    await user.save();
    res.json({ message: 'wantTeam updated', wantTeam: user.wantTeam });
  } catch (error) {
    console.error("Toggle wantTeam error:", error);
    res.status(500).json({ message: "Failed to update wantTeam", error: error.message });
  }
};
