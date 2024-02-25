const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true, // Removes whitespace from both ends of the string
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{3}/.test(v); // Validates a simple phone number format (e.g., 123-456-7890)
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true, // Ensures email addresses are unique in the collection
      lowercase: true, // Converts email to lowercase
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); // Validates a simple email format
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model("Supplier", supplierSchema);
