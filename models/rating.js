const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    RATING: {
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

module.exports = mongoose.model("Rating", ratingSchema);
