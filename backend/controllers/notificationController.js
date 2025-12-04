const Notification = require("../models/Notification");

/* ------------------------------------------
   GET ALL NOTIFICATIONS FOR LOGGED USER
------------------------------------------- */
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.error("Get Notifications Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ------------------------------------------
   CREATE NOTIFICATION (ADMIN / SYSTEM USE)
------------------------------------------- */
exports.createNotification = async (req, res) => {
  try {
    const { userId, title, message, link } = req.body;

    const notif = await Notification.create({
      user: userId,
      title,
      message,
      link: link || null,
    });

    res.status(201).json(notif);
  } catch (err) {
    console.error("Create Notification Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ------------------------------------------
   MARK ONE AS READ
------------------------------------------- */
exports.markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!notif) return res.status(404).json({ message: "Notification not found" });

    notif.isRead = true;
    await notif.save();

    res.json({ message: "Marked as read", notif });
  } catch (err) {
    console.error("Mark Read Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ------------------------------------------
   MARK ALL AS READ
------------------------------------------- */
exports.markAllRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );

    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    console.error("Mark All Read Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ------------------------------------------
   DELETE A NOTIFICATION
------------------------------------------- */
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.deleteOne({
      _id: req.params.id,
      user: req.user._id
    });

    res.json({ message: "Notification deleted" });
  } catch (err) {
    console.error("Delete Notification Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ------------------------------------------
   DELETE ALL NOTIFICATIONS
------------------------------------------- */
exports.clearAll = async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user._id });

    res.json({ message: "All notifications cleared" });
  } catch (err) {
    console.error("Clear All Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
