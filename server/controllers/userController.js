const User = require("../models/User");
const Notification = require("../models/Notification");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "username avatar")
      .populate("following", "username avatar");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.bio = req.body.bio ?? user.bio;
    user.avatar = req.body.avatar ?? user.avatar;
    user.username = req.body.username ?? user.username;

    const updated = await user.save();
    res.json({
      id: updated._id,
      username: updated.username,
      email: updated.email,
      role: updated.role,
      bio: updated.bio,
      avatar: updated.avatar,
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const followUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser) return res.status(404).json({ message: "User not found" });
    if (targetUser._id.toString() === currentUser._id.toString()) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const isFollowing = currentUser.following.includes(targetUser._id);

    if (isFollowing) {
      // Unfollow
      currentUser.following.pull(targetUser._id);
      targetUser.followers.pull(currentUser._id);
    } else {
      // Follow
      currentUser.following.push(targetUser._id);
      targetUser.followers.push(currentUser._id);

      await Notification.create({
        recipient: targetUser._id,
        sender: currentUser._id,
        type: "follow",
      });
    }

    await currentUser.save();
    await targetUser.save();

    res.json({
      following: !isFollowing,
      followerCount: targetUser.followers.length,
    });
  } catch (error) {
    console.error("Error following user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate("sender", "username avatar")
      .populate("post", "title slug")
      .sort({ createdAt: -1 })
      .limit(30);

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const markNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { $set: { read: true } }
    );
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  followUser,
  getNotifications,
  markNotificationsRead,
};
