const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");

// Create conversation (when user clicks "Chat")
exports.createConversation = async (req, res) => {
  const { userId } = req.body;  // receiver

  let convo = await Conversation.findOne({
    participants: { $all: [req.user._id, userId] }
  });

  if (!convo) {
    convo = await Conversation.create({
      participants: [req.user._id, userId]
    });
  }

  res.json(convo);
};

// Get logged-in user's conversations
exports.getUserConversations = async (req, res) => {
  const convos = await Conversation.find({
    participants: req.user._id
  }).populate("participants", "name profilePic linkedin");

  res.json(convos);
};

// Get all messages in conversation
exports.getMessages = async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.conversationId
  });

  res.json(messages);
};

// Send message
exports.sendMessage = async (req, res) => {
  const { conversationId, text } = req.body;

  const message = await Message.create({
    conversationId,
    sender: req.user._id,
    text,
  });

  res.json(message);
};