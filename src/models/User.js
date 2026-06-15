const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name: {type:String, requied: true},
    email: {type:String},
    profilePicture: {type:String},
    isVerified: {type:Boolean, required: true},
}, {timestamps: true})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);