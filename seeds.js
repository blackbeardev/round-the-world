var mongoose = require("mongoose");

var Destination = require("./models/destination");
var Comment = require("./models/comment");

var data = [
    {
        name: "Vancouver, Canada",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrML_4v6EH2atQQcgCz1hwzViz6hbvh91J7wv4x3dTC3cxYWJ",
        description: "This is Vancouver, an amazing city in British Columbia.  This image is of the Vancouver landscape."
    },
    {
        name: "Brisbane, Australia",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStagHVqslmT2oS7R7sINEz7i0jJYPof2BbcDwrWhfsVNhlR0iGfQ",
        description: "Brisbane is the third largest city in Australia, and the capital of the state of Queensland."
    },
    {
        name: "Wellington, New Zealand",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjvio0P5n6nLVcKEuwysckCKQXupBJ_42o-J8Oi5mj5rFDW2sv",
        description: "Wellington is the capital of New Zealand and is affectionately known as 'Windy Wellington'."
    },
    {
        name: "Machu Picchu, Peru",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTZBkvlTXOLjytq10vg-bcuU-HKiy61sI67BvrIgrweTLICA2Arg",
        description: "Machu Picchu is an extremely well-known travel destination.  Take a hike to the famous Inkan ruins."
    }
]

function seedDB() {
    //Remove all destinations:
    Destination.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Removed campgrounds..");
            //Add a few destinations:
            data.forEach(function(seed) {
                Destination.create(seed, function(err, destination) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Added a campground");
                        
                        //Create a comment on each campground:
                        Comment.create(
                            {
                                text: "This place is great, but there's still room for improvement.",
                                author: "Homer"
                            }, function(err, comment) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    //Push the comment into the campground comment's array:
                                    destination.comments.push(comment);
                                    destination.save();
                                    console.log("Comment created..");
                                }
                            });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;