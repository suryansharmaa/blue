const Post = require("../models/Post");
require("dotenv").config();

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const existingPost = await Post.findOne({ title, content });

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (existingPost) {
      return res.status(400).json({ message: "Post already exists" });
    }

    const newPost = await Post.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized action" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting the post: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
