const Order = require("../model/orderModel");
const Category = require("../model/categoryModel");
const moment = require("moment");

// Create a new order
exports.createOrder = async (req, res) => {
  const { categoryId, name, image } = req.body;
  try {
    const newOrder = new Order({
      name,
      image,
      category: categoryId,
    });

    const savedOrder = await newOrder.save();

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send("Category not found");
    }

    category.orders.push(savedOrder._id); // Add the order's ID to the category's orders array
    await category.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single order by id
exports.getOrderById = async (req, res) => {
  try {
    const orderDoc = await Order.find({
      category: req.params.categoryId,
    }).populate("category");

    const orders = orderDoc
      .map((doc) => {
        let order = doc.toObject(); // Convert to plain JavaScript object

        // Format the createdAt and updatedAt dates with moment
        if (order.createdAt) {
          order.createdAt = moment(order.createdAt).format("DD/MM/YYYY HH:mm");
        }
        if (order.updatedAt) {
          order.updatedAt = moment(order.updatedAt).format("DD/MM/YYYY HH:mm");
        }

        return order;
      })
      .reverse();
    if (!orders) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(orders);
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
