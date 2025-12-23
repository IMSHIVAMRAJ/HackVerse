const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getBookingsForUser, getBookingsForMentor, createBooking } = require('../controllers/bookingController');

router.get('/me', protect, getBookingsForUser);
router.get('/mentor/:mentorId', protect, getBookingsForMentor);
router.post('/', protect, createBooking); // optional manual create

module.exports = router;
