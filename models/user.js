const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    token: {
        type: String,
        trim: true,
        maxlength: 256
    },
}, { timestamps: true });

module.exports = mongoose.model("User",userSchema);
