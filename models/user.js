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
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true,
    },
    about:{
        type: String,
        trim: true,
    },
    salt:{
        type: String,
    },
    role:{
        type: Number,
        default:0
    },
    history:{
        type: Array,
        default: []
    }
},{timestamps: true});

///virtual field
userSchema.virtual('password')
.set(function(password){
    this._password=password;
    this.salt=uuidv1();
    this.hashed_password=this.encryptPassword(password)
    console.log(this.hashed_password)
})
.get(function(){
    return this._password;
})

userSchema.methods = {
    authenticate : function(plainText){
        console.log(plainText)
        console.log(" finally "+this.encryptPassword(plainText) + " finally " + this.hashed_password)
        return this.encryptPassword(plainText) === this.hashed_password;
      },
    encryptPassword : function(password){
        console.log(password)
        if(!password) return '';
        try{
            console.log("in try block")
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }catch(err){
            console.log(err)
            return "";
        }
    }
}

module.exports = mongoose.model("User",userSchema);
