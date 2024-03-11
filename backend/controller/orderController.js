const Order = require("../model/orderModel");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      category: req.params.categoryId,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single order by id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.find({
      category: req.params.categoryId,
    }).populate("category");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order by id
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order by id
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete({
      _id: req.params.id,
      category: req.params.categoryId,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
