const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        index: true,
        unique: false
    },
    Genre: {
        type: String,
        required: true
    },
    MonthlyListeners: {
        type: Number,
        required: true
    }
});


const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;