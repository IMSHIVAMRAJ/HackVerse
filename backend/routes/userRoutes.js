const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const upload = require("../middleware/upload");

router.route("/profile")
  .get(protect, getProfile)
  .put(protect, upload.single("profilePic"), updateProfile);

module.exports = router;
