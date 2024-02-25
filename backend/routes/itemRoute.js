const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemController");

// Existing routes for creating and listing orders
router.post("/", itemController.createItem);
router.get("/", itemController.getAllItem);

// Additional routes
router.get("/:id", itemController.getItemById); // Retrieve a single order by ID
router.put("/:id", itemController.updateItem); // Update an order by ID
router.delete("/:id", itemController.deleteItem); // Delete an order by ID

module.exports = router;
