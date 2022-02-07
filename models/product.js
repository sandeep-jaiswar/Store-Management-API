const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    NAME: {
      type: String,
      trim: true,
      maxlength: 50,
      required: false,
    },
    IS_RATED: {
      type: Boolean,
      default: false,
      required: false,
    },
    CATEGORY: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
    BRAND_ID: {
      type: ObjectId,
      trim: true,
      ref: "Brand",
      required: true,
    },
    COLOR: {
      type: String,
      trim: true,
      maxlength: 15,
      required: false,
    },
    COUNTRY_OF_ASSEMBLY: {
      type: String,
      trim: true,
      maxlength: 20,
      required: false,
    },
    COUNTRY_OF_ORIGIN: {
      type: String,
      trim: true,
      maxlength: 20,
      required: false,
    },
    GTIN: {
      type: String,
      trim: true,
      maxlength: 20,
      required: false,
    },
    HAS_MERCHANT_RETURN_POLICY: {
      type: Boolean,
      default: false,
      required: false,
    },
    HAS_MEASUREMENT: {
      type: Boolean,
      default: false,
      required: false,
    },
    IS_RELATED_TO: {
      type: String,
      trim: true,
      maxlength: 200,
      required: false,
    },
    HAS_VARIANT: {
      type: Boolean,
      default: 0,
      required: false,
    },
    MANUFACTURER: {
      type: String,
      trim: true,
      maxlength: 20,
      required: false,
    },
    PRODUCTION_DATE: {
      type: Date,
      required: false,
    },
    IMAGE: {
      type: String,
      trim: true,
      maxlength: 250,
      required: false,
    },
    ALL_IMAGE: {
      type: String,
      trim: true,
      maxlength: 1000,
      required: false,
    },
    OFFER_PRICE: {
      type: Number,
      trim: true,
      required: true,
    },
    SELLING_PRICE: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
