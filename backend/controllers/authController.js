const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => { 
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};  

// @desc Register new user
exports.registerUser = async (req, res) => {
  // 1. Get ALL the data from the request
  const { name, email, password, github, linkedin } = req.body;
  const skills = JSON.parse(req.body.skills || '[]'); // Parse skills from string
  const profilePicUrl = req.file ? req.file.path : null; // 🖼️ Get image URL from multer/cloudinary

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    

    // 2. Create the user with ALL the new fields
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic: profilePicUrl, // 👈 Save the image URL
      skills,                   // 👈 Save the skills array
      socials: {                // 👈 Save social links (adjust to your schema)
        github: github || '',
        linkedin: linkedin || '',
      },
    });

    // 3. Respond with more user info and the token
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id), // Generate and send the auth token
    });
    
  } catch (error) {
    console.error("SIGNUP ERROR:", error); // Log the full error on the server
    res.status(500).json({ message: "Server error during registration." });
  }
};

// @desc Auth user & get token
exports.authUser = async (req, res) => {
   console.log("✅ SIGNUP ROUTE HIT!"); 
  const { email, password } = req.body;
 console.log("✅ SIGNUP ROUTE HITT!"); 
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

