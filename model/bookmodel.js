const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const bookSchema = new Schema({
  bookTitle: { type: String, required: true },
  bookAuthor: { type: String, required: true },
  description: { type: String },
});

// This creates the collection.
const Bookmodel = mongoose.model("300387314-carlos", bookSchema);
module.exports = Bookmodel;