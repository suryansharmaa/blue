const Category = require("../models/Category");
const slugify = require("slugify");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Category name is required" });

    const exists = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
    if (exists) return res.status(400).json({ message: "Category already exists" });

    const slug = slugify(name, { lower: true, strict: true });
    const category = await Category.create({ name, slug, description });

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createCategory, getCategories };
