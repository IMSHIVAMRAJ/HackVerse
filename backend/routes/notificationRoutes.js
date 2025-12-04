const express = require("express");
const router = express.Router();
const {
  getNotifications,
  createNotification,
  markAsRead,
  markAllRead,
  deleteNotification,
  clearAll
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

// User gets notifications
router.get("/", protect, getNotifications);

// Admin/system creates notification
router.post("/", createNotification);

// Mark one as read
router.put("/:id/read", protect, markAsRead);

// Mark all as read
router.put("/read/all", protect, markAllRead);

// Delete one
router.delete("/:id", protect, deleteNotification);

// Delete all
router.delete("/", protect, clearAll);

module.exports = router;
