const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 32,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "moderator", "admin"],
        default: "user"
    }, 
    registrationDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("account", accountSchema);