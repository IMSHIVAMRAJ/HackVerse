// routes/ideaRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // your auth middleware
const { getMyIdeas, createIdea, updateIdea, deleteIdea } = require('../controllers/ideaController');

// all routes protected: user must be logged in
router.get('/', protect, getMyIdeas);
router.post('/', protect, createIdea);
router.put('/:id', protect, updateIdea);
router.delete('/:id', protect, deleteIdea);

module.exports = router;
