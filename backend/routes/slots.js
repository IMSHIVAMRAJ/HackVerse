const express = require('express');
const router = express.Router();
const { mentorProtect } = require('../middleware/mentorAuth');

const { createSlot, getSlotsForMentor, updateSlotStatus } = require('../controllers/slotController');

router.post('/', mentorProtect, createSlot); // mentor create slot
router.get('/mentor/:mentorId', getSlotsForMentor);
router.put('/:id/status', mentorProtect, updateSlotStatus);

module.exports = router;
