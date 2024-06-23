const Supplier = require("../models/Supplier");
const Activity = require("../models/Activity");

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ user: req.user._id });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (supplier.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createSupplier = async (req, res) => {
  const { name, address, phoneNumber, email } = req.body;

  try {
    const supplier = new Supplier({
      name,
      address,
      phoneNumber,
      email,
      user: req.user._id,
    });

    const createdSupplier = await supplier.save();

    await Activity.create({
      user: req.user._id,
      action: "created",
      entityType: "supplier",
      entityId: createdSupplier._id,
      entityName: createdSupplier.name,
    });

    res.status(201).json(createdSupplier);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSupplier = async (req, res) => {
  const { name, address, phoneNumber, email } = req.body;

  try {
    const supplier = await Supplier.findById(req.params.id);

    if (supplier.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    supplier.name = req.body.name || supplier.name;
    supplier.address = req.body.address || supplier.address;
    supplier.phoneNumber = req.body.phoneNumber || supplier.phoneNumber;
    supplier.email = req.body.email || supplier.email;

    const updatedSupplier = await supplier.save();

    await Activity.create({
      user: req.user._id,
      action: "updated",
      entityType: "supplier",
      entityId: updatedSupplier._id,
      entityName: updatedSupplier.name,
    });
    res.json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// const deleteSupplier = asyncHandler(async (req, res) => {
//   const supplier = await Supplier.findById(req.params.id);

//   if (supplier) {
//     await supplier.remove();
//     await Activity.create({
//       user: req.user._id,
//       action: "deleted",
//       entityType: "supplier",
//       entityId: supplier._id,
//       entityName: supplier.name,
//     });
//     res.json({ message: "Supplier removed" });
//   } else {
//     res.status(404);
//     throw new Error("Supplier not found");
//   }
// });
