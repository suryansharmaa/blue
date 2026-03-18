const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/rbacMiddleware");

router.post("/", protect, requireRole("admin"), createCategory);
router.get("/", getCategories);

module.exports = router;
