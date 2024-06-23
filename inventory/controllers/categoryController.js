const Category = require("../models/Category");
const Item = require("../models/Item");
const Activity = require("../models/Activity");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const items = await Item.find({ category: category._id });
    res.json({ category, items });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createCategory = async (req, res) => {
  const { name, image } = req.body;

  try {
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // Get the path from the uploaded file
    }

    const category = new Category({
      name,
      image: imagePath,
      user: req.user._id,
    });

    const createdCategory = await category.save();

    await Activity.create({
      user: req.user._id,
      action: "created",
      entityType: "category",
      entityId: createdCategory._id,
      entityName: createdCategory.name,
    });

    res.status(201).json(createdCategory);
  } catch (error) {
    console.error("Error creating category:", error); // Log the error details
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCategory = async (req, res) => {
  const { name, image } = req.body;

  try {
    const category = await Category.findById(req.params.id);

    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    category.name = name;
    category.image = image;

    const updatedCategory = await category.save();

    await Activity.create({
      user: req.user._id,
      action: "updated",
      entityType: "category",
      entityId: updatedCategory._id,
      entityName: updatedCategory.name,
    });

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await category.remove();

    await Activity.create({
      user: req.user._id,
      action: "deleted",
      entityType: "category",
      entityId: category._id,
      entityName: category.name,
    });

    res.json({ message: "Category removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
