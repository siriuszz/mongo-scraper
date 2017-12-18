// Dependencies ========================

// For scraping the site
var cheerio = require("cheerio");

// // For keeping notes
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


// var db = require("./models");

var PORT = 8080;

var app = express();


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/gtbc-mongo-scraper", {
    useMongoClient: true
});


// Routes ===================

//======================================================================

// GET route for scraping the IMDB news page
app.get("/scrape", function(req, res) {

    axios.get("http://www.imdb.com/news/top").then(function(response) {
        var $ = cheerio.load(response.data);

        $("h2.news-article__title").each(function(i, element) {

            var result = {};

            // Add the text and href of every link
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article
            db.Article
                .create(result)
                .then(function(dbArticle) {
                    // Send a success message to the client
                    res.send("Scrape Complete");
                })
                .catch(function(err) {
                    res.json(err);
                });
        });
    });
});

// // Route for getting all Articles from the db
// app.get("/articles", function(req, res) {
//     db.Article
//         .find({})
//         .then(function(dbArticle) {
//             // Send articles back to the client
//             res.json(dbArticle);
//         })
//         .catch(function(err) {
//             res.json(err);
//         });
// });

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article
        .findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function(dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note
        .create(req.body)
        .then(function(dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function(dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});
//
//
// // Listen on port 8080
app.listen(PORT, function() {
    console.log("App running on port " + PORT + ".");
});