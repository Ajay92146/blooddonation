const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['donor', 'receiver'] },
    bloodGroup: String,
    availability: { type: Boolean, default: true },
    location: {
        city: String,
        lat: Number,
        lng: Number
    }
});

module.exports = mongoose.model('User', UserSchema);
