const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 32
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                const errors = [];
                if (value.length < 16) {
                    errors.push("minst 16 tecken");
                }
                if (!/[A-Z]/.test(value)) {
                    errors.push("minst en versal");
                }
                if (!/[a-z]/.test(value)) {
                    errors.push("minst en gemen");
                }
                if (!/[!@#$%^&*]/.test(value)) {
                    errors.push("minst ett specielt tecken (!@#$%^&*)");
                }

                if (errors.length > 0) {
                    throw new Error(`Lösenordet måste ha: ${errors.join(", ")}`)
                }

                return true;
            }
        }
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