var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/roundtheworld");

// Schema Setup

var destinationSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Destination = mongoose.model("Destination", destinationSchema);

// Destination.create({
//     name: "Rome, Italy",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCLt21VklKaQLufaMRjJ8ltUyf5GLofYUk8psLqDi7jPuvVLwOag",
//     description: "Rome is beautiful in summer, but very crowded with tourists."
// }, function(err, destination) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Newly created destination..");
//         console.log(destination);
//     }
// });


// Routes

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/destinations", function(req, res) {
    // res.render("destinations", {destinations: destinations});
    Destination.find({}, function(err, allDestinations) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {destinations: allDestinations});
        }
    });
});

app.get("/destinations/new", function(req, res) {
    res.render("new");
});

app.post("/destinations", function(req, res) {
//   var name = req.body.name;
//   var image = req.body.image;
//   var description = req.body.description;
   var newDestination = req.body.destination;
   
   Destination.create(newDestination, function(err, newlyCreated) {
       if(err) {
           console.log(err);
           res.redirect("/destinations/new");
       } else {
           console.log("New destination created...");
           res.redirect("/destinations");
       }
   });
});



app.get("/destinations/:id", function(req, res) {
    Destination.findById(req.params.id, function(err, foundDestination) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {destination:foundDestination});
        }
    });
});


app.get("/destinations/:id/edit", function(req, res) {
    Destination.findById(req.params.id, function(err, foundDestination) {
        if(err) {
            console.log(err);
        } else {
            res.render("edit", {destination: foundDestination});
        }
    });
});

app.put("/destinations/:id", function(req, res) {
    Destination.findByIdAndUpdate(req.params.id, req.body.destination, function(err, updatedDestination) {
        if(err) {
            console.log(err);
            res.redirect("/destinations");
        } else {
            res.redirect("/destinations/" + req.params.id);
        }
    })
})

//Start the server:
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The application has started..");
});