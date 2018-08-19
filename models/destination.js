var mongoose = require("mongoose");

// Schema Setup

var destinationSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;