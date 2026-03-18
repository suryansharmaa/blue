const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  followUser,
  getNotifications,
  markNotificationsRead,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/notifications", protect, getNotifications);
router.put("/notifications/read", protect, markNotificationsRead);
router.get("/:id", getProfile);
router.put("/profile", protect, updateProfile);
router.put("/:id/follow", protect, followUser);

module.exports = router;
