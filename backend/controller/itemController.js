const Item = require("../model/itemModel");

exports.createItem = async (req, res) => {
  let { items, supplier, orderedAt, order } = req.body;

  //Calculate total price for each item
  items = items.map((item) => ({
    ...item,
    totalPrice: item.quantity * item.pricePerItem,
  }));

  try {
    const newItem = new Item({
      items,
      supplier,
      orderedAt,
      order,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllItem = async (req, res) => {
  try {
    // Populate 'supplier' to include supplier details in the response
    const items = await Item.find().populate([
      {
        path: "order",
      },
      { path: "supplier" },
    ]);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate([
      {
        path: "order",
      },
      { path: "supplier" },
    ]);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const { items, supplier } = req.body;
  let updateData = {};

  // Optionally recalculate total price for each item if items are updated
  if (items) {
    updateData.items = items.map((item) => ({
      ...item,
      totalPrice: item.quantity * item.pricePerItem,
    }));
  }
  if (supplier) {
    updateData.supplier = supplier;
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    ).populate("supplier");
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
