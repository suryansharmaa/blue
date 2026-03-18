const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentsByPost,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/:postId", protect, addComment);
router.get("/:postId", getCommentsByPost);
router.delete("/:id", protect, deleteComment);

module.exports = router;
