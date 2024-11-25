const mongoose = require("mongoose");
const validator = require("validator");

const CategorySchema = mongoose.Schema(
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
        "https://img.icons8.com/?size=100&id=61190&format=png&color=000000",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
