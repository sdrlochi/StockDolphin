const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const { protect } = require("../middleware/userMiddleware");

// POST request to create a new order
router.post(
  "/categories/:categoryId/orders",
  protect,
  orderController.createOrder
);

// GET request for a single order by id
router.get(
  "/categories/:categoryId/orders",
  protect,
  orderController.getOrderById
);

// PUT request to update an order by id
router.put(
  "/categories/:categoryId/orders/:id",
  protect,
  orderController.updateOrder
);

// DELETE request to delete an order by id
router.delete(
  "/categories/:categoryId/orders/:id",
  protect,
  orderController.deleteOrder
);

module.exports = router;
