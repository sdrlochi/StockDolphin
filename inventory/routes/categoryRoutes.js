const express = require("express");
const {
  getCategoryById,
  updateCategory,
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, getCategories)
  .post(protect, upload.single("image"), createCategory);

router
  .route("/:id")
  .get(protect, getCategoryById)
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);
module.exports = router;
