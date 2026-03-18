const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const Post = require("../models/Post");

const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      post: postId,
      author: req.user._id,
      content,
    });

    const populated = await comment.populate("author", "username avatar");

    // Notify post author
    if (post.author.toString() !== req.user._id.toString()) {
      await Notification.create({
        recipient: post.author,
        sender: req.user._id,
        type: "comment",
        post: postId,
      });
    }

    res.status(201).json(populated);
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username avatar")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (
      comment.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addComment, getCommentsByPost, deleteComment };
