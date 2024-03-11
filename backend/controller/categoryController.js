const Category = require("../model/categoryModel");
const moment = require("moment");

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2); // months are 0-based
  const day = ("0" + d.getDate()).slice(-2);
  const hour = ("0" + d.getHours()).slice(-2);
  const minute = ("0" + d.getMinutes()).slice(-2);
  return `${day}/${month}/${year} ${hour}:${minute}`;
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    const category = new Category({
      user: req.user._id,
      name,
      image,
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    // Fetch all categories for the user
    const categoryDocs = await Category.find({ user: req.user._id });

    // Format dates and reverse the array to maintain your original order if needed
    const categories = categoryDocs
      .map((doc) => {
        let category = doc.toObject(); // Convert to plain JavaScript object

        // Format the createdAt and updatedAt dates with moment
        if (category.createdAt) {
          category.createdAt = moment(category.createdAt).format(
            "DD/MM/YYYY HH:mm"
          );
        }
        if (category.updatedAt) {
          category.updatedAt = moment(category.updatedAt).format(
            "DD/MM/YYYY HH:mm"
          );
        }

        return category;
      })
      .reverse(); // Reverse the array to maintain the original order if needed

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category by id
exports.getCategory = async (req, res) => {
  const _id = req.params.id;
  try {
    const category = await Category.findOne({ _id, user: req.user._id });
    if (!category) {
      return res.status(404).send();
    }
    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a category by id
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a category by id
exports.deleteCategory = async (req, res) => {
  try {
    if (category.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
