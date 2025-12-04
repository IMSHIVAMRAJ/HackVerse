const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createConversation, getUserConversations, getMessages, sendMessage } = require("../controllers/chatController");

router.post("/conversation", protect, createConversation);
router.get("/conversation", protect, getUserConversations);

router.get("/messages/:conversationId", protect, getMessages);
router.post("/message", protect, sendMessage);

module.exports = router;
