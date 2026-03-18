const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createPost);
router.delete("/:id", protect, deletePost);
router.put("/:id", protect, updatePost);
router.put("/:id/like", protect, likePost);

router.get("/", getPosts);
router.get("/:id", getPostById);

module.exports = router;
