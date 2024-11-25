const mongoose = require("mongoose");
const validator = require("validator");

const invoiceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "Image should be a valid URl",
      },
      default:
        "https://img.icons8.com/?size=100&id=53603&format=png&color=000000",
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
