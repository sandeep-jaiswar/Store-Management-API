const mongoose = require("mongoose");

const audienceSchema = new mongoose.Schema(
  {
    AUDIENCE: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Audience", audienceSchema);
