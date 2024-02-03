const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    role: {
        type: String,
        default: 'user', // Default role is 'user', but you can change it as needed
      },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
}, {timestamps: true})


module.exports = mongoose.model("User", userSchema)