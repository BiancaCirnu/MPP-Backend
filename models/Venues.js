const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
    Name: {
        type: String, 
        index: true
    },
    Address: {
        type: String, 
        unique: true
    },
    City: {
        type: String, 
        index: true
    },
    Country: String
});


const Venue = mongoose.model("Venue", VenueSchema);
module.exports = Venue;