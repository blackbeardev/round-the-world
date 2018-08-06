var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
    res.render("landing");
});


//Start the server:
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The application has started..");
});