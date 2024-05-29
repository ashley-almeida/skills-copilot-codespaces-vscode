// Create web server
// npm install express
// npm install body-parser
// npm install ejs
// npm install mongoose

// require all dependencies
var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var mongoose = require("mongoose");

// create an express app
var app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// set the body parser
app.use(bodyParser.urlencoded({extended: true}));

// connect to the database
mongoose.connect("mongodb://localhost/comments_app", { useNewUrlParser: true });

// create a schema for the comments
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// create a model for the comments
var Comment = mongoose.model("Comment", commentSchema);

// create a new comment
// Comment.create({
//     name: "John",
//     comment: "This is a comment"
// }, function(err, comment) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(comment);
//     }
// });

// set the home route
app.get("/", function(req, res) {
    res.redirect("/comments");
});

// set the comments route
app.get("/comments", function(req, res) {
    Comment.find({}, function(err, comments) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments", {comments: comments});
        }
    });
});

// set the new comment route
app.get("/comments/new", function(req, res) {
    res.render("new");
});

// set the create comment route
app.post("/comments", function(req, res) {
    Comment.create(req.body.comment, function(err, comment) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/comments");
        }
    });
});

// start the server
app.listen(3000, function() {
    console.log("Server started on port 3000");
});