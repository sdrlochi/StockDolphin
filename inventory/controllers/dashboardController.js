const Category = require("../models/Category");
const Item = require("../models/Item");
const Order = require("../models/Order");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get categories count
    const categoriesCount = await Category.countDocuments({ user: userId });

    // Get items count
    const items = await Item.find({ user: userId });
    const itemsCount = items.length;

    // Get orders count and total price
    const orders = await Order.find({ user: userId });
    const ordersCount = orders.length;
    const totalPrice = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    // Get recent activities
    const recentActivities = await getRecentActivities(userId);

    // Get recent orders
    const recentOrders = orders.slice(-5).reverse(); // last 5 orders

    res.json({
      categoriesCount,
      itemsCount,
      ordersCount,
      totalPrice,
      recentActivities,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getRecentActivities = async (userId) => {
  const categories = await Category.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5);
  const items = await Item.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5);
  const orders = await Order.find({ user: userId }).sort({ date: -1 }).limit(5);

  const recentActivities = [];

  categories.forEach((category) =>
    recentActivities.push({
      type: "category",
      action: "created",
      name: category.name,
      date: category.createdAt,
    })
  );
  items.forEach((item) =>
    recentActivities.push({
      type: "item",
      action: "created",
      name: item.name,
      date: item.createdAt,
    })
  );
  orders.forEach((order) =>
    recentActivities.push({
      type: "order",
      action: "created",
      date: order.date,
    })
  );

  return recentActivities.sort((a, b) => b.date - a.date).slice(0, 5);
};
