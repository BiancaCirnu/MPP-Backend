const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        enum: ["admin", "regular"],
        required: true
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;