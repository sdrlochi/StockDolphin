const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  supplier: { type: String, required: true },
  date: { type: Date, default: Date.now },
  orders: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
