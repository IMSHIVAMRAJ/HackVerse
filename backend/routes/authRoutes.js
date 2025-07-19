const express = require('express');
const { registerUser, authUser } = require('../controllers/authController');
const router = express.Router();
const multer = require("multer")

const upload = multer({ storage: multer.memoryStorage() })
router.post('/signup', upload.single("profilePic"), registerUser);
router.post('/login', authUser);

module.exports = router;

