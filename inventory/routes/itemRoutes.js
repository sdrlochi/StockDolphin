const itemController = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");
const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router
  .route("/:id")
  .get(protect, itemController.getItemById)
  .put(protect, itemController.updateItem)
  .delete(protect, itemController.deleteItem);
router
  .route("/:categoryId/items")
  .get(protect, itemController.getItemsByCategory)
  .post(protect, upload.single("image"), itemController.createItem);

module.exports = router;
