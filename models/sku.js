const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const skuSchema = new mongoose.Schema(
  {
    QUANTITY: {
      type: Number,
      trim: true,
      required: true,
    },
    PRODUCT_ID: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sku", skuSchema);
