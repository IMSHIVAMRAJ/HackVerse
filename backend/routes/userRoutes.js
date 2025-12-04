const express = require('express');
const { getProfile, updateProfile, getWantTeamMembers, toggleWantTeam } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const upload = require("../middleware/upload");


router.route("/profile")
  .get(protect, getProfile)
  .put(protect, upload.single("profilePic"), updateProfile);

router.get('/members/want-team', getWantTeamMembers);
router.put('/want-team', protect, toggleWantTeam);

module.exports = router;
