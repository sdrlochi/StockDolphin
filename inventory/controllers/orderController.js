const Order = require("../models/Order");
const Activity = require("../models/Activity");
const Item = require("../models/Item")

// exports.getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (order.user.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.getOrdersByItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const orders = await Order.find({
      itemId,
      user: req.user._id,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createOrder = async (req, res) => {
  const { itemId } = req.params;
  const { quantity, totalPrice, suppliers, } = req.body;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const order = new Order({
      itemId,
      quantity,
      totalPrice,
      suppliers,
      user: req.user._id,
    });

    const createdOrder = await order.save();

    await Activity.create({
      user: req.user._id,
      action: "created",
      entityType: "order",
      entityId: createdOrder._id,
      entityName: createdOrder.name || "Order",
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { item, quantity, totalPrice, suppliers } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    order.item = item;
    order.quantity = quantity;
    order.totalPrice = totalPrice;
    order.suppliers = suppliers;

    const updatedOrder = await order.save();

    await Activity.create({
      user: req.user._id,
      action: "updated",
      entityType: "order",
      entityId: updatedOrder._id,
      entityName: `Order ${updatedOrder._id}`,
    });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await order.remove();

    await Activity.create({
      user: req.user._id,
      action: "deleted",
      entityType: "order",
      entityId: order._id,
      entityName: `Order ${order._id}`,
    });
    res.json({ message: "Order removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
