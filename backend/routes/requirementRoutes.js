const express = require('express');
const { createRequirement, getAllRequirements, getTeamRequirements, getMemberRequirements } = require('../controllers/requirementController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createRequirement).get(getAllRequirements);
router.route('/team').get(getTeamRequirements);
router.route('/member').get(getMemberRequirements);

module.exports = router;
