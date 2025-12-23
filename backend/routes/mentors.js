const express = require('express');
const router = express.Router();
const { mentorProtect } = require('../middleware/mentorAuth');

const { createMentor, getMentors, getMentor, updateMentor } = require('../controllers/mentorController');

router.get('/', getMentors);
router.get('/:id', getMentor);
router.post('/', mentorProtect, createMentor); // mentor or admin
router.put('/:id', mentorProtect, updateMentor);

module.exports = router;
