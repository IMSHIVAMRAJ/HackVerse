// routes/mentorsAuth.js
const express = require('express');
const router = express.Router();
const { registerMentor, loginMentor, getMentorProfile } = require('../controllers/mentorAuthController');
const { mentorProtect } = require('../middleware/mentorAuth');

router.post('/register', registerMentor);
router.post('/login', loginMentor);
router.get('/me', mentorProtect, getMentorProfile);

module.exports = router;
