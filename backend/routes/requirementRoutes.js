const express = require('express');
const { createRequirement, getAllRequirements, getTeamRequirements, getMemberRequirements, getMyRequirements,
  updateRequirement,
  deleteRequirement, } = require('../controllers/requirementController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// router.route('/').post(protect, createRequirement).get(getAllRequirements);
router.route('/').post(protect, createRequirement);
router.route('/team').get(getTeamRequirements);
// router.route('/member').get(getMemberRequirements);
router.get("/my", protect, getMyRequirements); 
router.put("/:id", protect, updateRequirement); 
router.delete("/:id", protect, deleteRequirement); 
module.exports = router;
