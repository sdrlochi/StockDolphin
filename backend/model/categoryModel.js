
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    imagePath: {
      type: String,
      required: false, // Depending on whether you want to make the image mandatory
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
