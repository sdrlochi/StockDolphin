const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");
const { protect } = require("../middleware/userMiddleware");

router.post("/", protect, createCategory);

router.get("/",protect, getAllCategories);

router.get("/:id",protect, getCategoryById);

router.put("/:id",protect, updateCategory);

router.delete("/:id",protect, deleteCategory);

module.exports = router;
