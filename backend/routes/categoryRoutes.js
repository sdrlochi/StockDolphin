const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");
const { protect } = require("../middleware/userMiddleware");

router.post("/categories", protect, createCategory);

router.get("/categories", protect, getAllCategories);

router.get("/categories/:id", protect, getCategory);

router.put("/categories/:id", protect, updateCategory);

router.delete("/categories/:id", protect, deleteCategory);

module.exports = router;
