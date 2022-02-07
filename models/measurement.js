const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema(
  {
    HEIGHT: {
      type: Number,
      trim: true,
      required: false,
    },
    WIDTH: {
      type: Number,
      trim: true,
      required: false,
    },
    DEPTH: {
      type: Number,
      trim: true,
      required: false,
    },
    PRODUCT_ID: {
      type: ObjectId,
      ref: "Product",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Measurement", measurementSchema);
