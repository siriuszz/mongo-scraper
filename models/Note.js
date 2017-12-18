var mongoose = require("mongoose");

// Reference to the Schema constructor
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: String,
    body: String
});

// Create model
var Note = mongoose.model("Note", NoteSchema);

// Export model
module.exports = Note;
