const mongoose = require("mongoose");

const OperationSchema = mongoose.Schema(
  {
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    amount: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Operation = mongoose.model("Operation", OperationSchema);

module.exports = Operation;
