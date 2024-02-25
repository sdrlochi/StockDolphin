const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

// POST request to create a new order
router.post("/", orderController.createOrder);

// GET request for all orders
router.get("/", orderController.getAllOrders);

// GET request for a single order by id
router.get("/:id", orderController.getOrderById);

// PUT request to update an order by id
router.put("/:id", orderController.updateOrder);

// DELETE request to delete an order by id
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
