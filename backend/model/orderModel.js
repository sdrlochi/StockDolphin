const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  
    name: { type: String, required: true },
    image: { type: String, required: false },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  

  orderedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
