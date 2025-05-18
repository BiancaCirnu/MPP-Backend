const mongoose = require('mongoose');

const ConcertSchema = new mongoose.Schema({
    Artist: {
        type: String,
        trim: true,
        index: true
    },
    Venue: {
        type: String,
        trim: true,
        index: true
    },
    Date: {
        type: Date,
        required: true,
        index: true
    },
    Description: {
        type: String,
        trim: true,
        default: ''
    },
    PosterURL: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    timestamps: true
});

const Concert = mongoose.model('Concert', ConcertSchema);
module.exports = Concert;