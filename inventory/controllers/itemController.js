const Item = require("../models/Item");
const Order = require("../models/Order");
const Activity = require("../models/Activity");
const Category = require("../models/Category");

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getItemsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const items = await Item.find({
      categoryId,
      user: req.user._id,
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const orders = await Order.find({ item: item._id });
    res.json({ item, orders });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createItem = async (req, res) => {
  const { categoryId } = req.params;
  const { name, image } = req.body;

  try {
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // Get the path from the uploaded file
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Create the new item
    const item = new Item({
      name,
      image: imagePath,
      categoryId,
      user: req.user._id,
    });

    const createdItem = await item.save();

    // Log the activity
    await Activity.create({
      user: req.user._id,
      action: "created",
      entityType: "item",
      entityId: createdItem._id,
      entityName: createdItem.name,
    });

    res.status(201).json(createdItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const { name, image, category } = req.body;

  try {
    const item = await Item.findById(req.params.id);

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    item.name = name;
    item.image = image;
    item.category = category;

    const updatedItem = await item.save();

    await Activity.create({
      user: req.user._id,
      action: "updated",
      entityType: "item",
      entityId: updatedItem._id,
      entityName: updatedItem.name,
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await item.remove();

    await Activity.create({
      user: req.user._id,
      action: "deleted",
      entityType: "item",
      entityId: item._id,
      entityName: item.name,
    });
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
