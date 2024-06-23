const Invoice = require("../models/Invoice");


exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createInvoice = async (req, res) => {
  const { name, supplier, orders } = req.body;

  try {
    const invoice = new Invoice({
      name,
      supplier,
      orders,
      user: req.user._id,
    });

    const createdInvoice = await invoice.save();
    await Activity.create({
      user: req.user._id,
      action: 'created',
      entityType: 'category',
      entityId: createdCategory._id,
      entityName: createdCategory.name,
    });
    res.status(201).json(createdInvoice);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateInvoice = async (req, res) => {
  const { name, supplier, orders } = req.body;

  try {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    invoice.name = name;
    invoice.supplier = supplier;
    invoice.orders = orders;

    const updatedInvoice = await invoice.save();
    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await invoice.remove();
    res.json({ message: "Invoice removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
