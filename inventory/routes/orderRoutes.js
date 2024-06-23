const express = require("express");
const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByItem,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:id").put(protect, updateOrder).delete(protect, deleteOrder);
router
  .route("/items/:itemId")
  .get(protect, getOrdersByItem)
  .post(protect, createOrder);

module.exports = router;
