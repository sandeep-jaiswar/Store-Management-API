const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description:{
        type:String,
        trim: true,
        maxlength:2000,
        required : true
    },
    price:{
        type:Number,
        trim:true,
        required:true
    },
    category:{
        type:ObjectId,
        ref:'Category',
        required:true
    },
    quantity:{
        type:Number,
        required : true
    },
    sold:{
        type:Number,
        default : 0
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    shipping:{
        type:Boolean,
        required:false
    }
},{timestamps: true});

module.exports = mongoose.model("Product",productSchema);
