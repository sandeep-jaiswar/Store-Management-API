const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        unique:true,
        trim: true,
        required: true,
        maxlength: 10
    },
    name: {
        type: String,
        trim: true,
        required: false,
        maxlength: 32
    },
    otp: {
        type: String,
        trim: true,
        required: false,
        maxlength: 4
    },
    token: {
        type: String,
        trim: true,
        maxlength: 256
    },
}, { timestamps: true });

module.exports = mongoose.model("User",userSchema);
