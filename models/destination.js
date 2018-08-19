var mongoose = require("mongoose");

// Schema Setup

var destinationSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    
    ]
});

var Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;