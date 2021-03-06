var mongoose = require("mongoose");

// Reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // byline: {
    //     type: String,
    //     required: true
    // },
    // summary: {
    //     type: String,
    //     required: true
    // },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// Create model
var Article = mongoose.model("Article", ArticleSchema);

// Export model
module.exports = Article;
