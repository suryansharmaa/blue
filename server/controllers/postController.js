const Post = require("../models/Post");
const Notification = require("../models/Notification");
const slugify = require("slugify");
require("dotenv").config();

const createPost = async (req, res) => {
  try {
    const { title, content, summary, category, tags, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const slug = slugify(title, { lower: true, strict: true }) + "-" + Date.now();

    const newPost = await Post.create({
      title,
      slug,
      content,
      summary: summary || content.substring(0, 200),
      author: req.user._id,
      category: category || undefined,
      tags: tags || [],
      image: image || undefined,
    });

    const populated = await newPost.populate("author", "username avatar");
    res.status(201).json(populated);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, q, tag, category, author } = req.query;
    const filter = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
      ];
    }
    if (tag) filter.tags = tag.toLowerCase();
    if (category) filter.category = category;
    if (author) filter.author = author;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .populate("author", "username avatar")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      posts,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username avatar bio")
      .populate("category", "name slug");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.summary = req.body.summary || post.summary;
    post.tags = req.body.tags || post.tags;
    post.category = req.body.category || post.category;
    post.image = req.body.image || post.image;

    if (req.body.title) {
      post.slug = slugify(req.body.title, { lower: true, strict: true }) + "-" + Date.now();
    }

    const updatedPost = await post.save();
    const populated = await updatedPost.populate("author", "username avatar");
    res.json(populated);
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id;
    const index = post.likes.indexOf(userId);

    if (index === -1) {
      post.likes.push(userId);
      // Create notification for post author
      if (post.author.toString() !== userId.toString()) {
        await Notification.create({
          recipient: post.author,
          sender: userId,
          type: "like",
          post: post._id,
        });
      }
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.json({ likes: post.likes, liked: index === -1 });
  } catch (error) {
    console.error("Error liking post:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost, likePost };
