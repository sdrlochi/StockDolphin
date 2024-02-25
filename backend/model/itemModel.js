const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    items: [
      {
        quantity: { type: Number, required: true, min: 1 },
        pricePerItem: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
      },
    ],
    orderedAt: { type: Date, default: Date.now },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
