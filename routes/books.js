const router = require('express').Router();
const Book = require('../model/bookmodel');

// To get all Books
router.route('/').get((req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Get a book with an specific id
router.route('/:id').get((req, res) => {
  console.log('just id' + req.params.id);
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Create a new book
router.route('/').post(async (req, res) => {
  const book = req.body;

  const newBook = await new Book({
    bookTitle: book.bookTitle,
    bookAuthor: book.bookAuthor,
    description: book.description
  });

  newBook
    .save()
    .then(() => res.json('Book added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Update a book give a specific id
router.route('/:id').put(async (req, res) => {
  console.log(req.params.id);
  const  book  = req.body;

  await Book.findById(req.params.id)
    .then((bookforedit) => {
      if (!bookforedit) {
        return res.status(404).json('Book not found!');
      }

      bookforedit.bookTitle = book.bookTitle;
      bookforedit.bookAuthor = book.bookAuthor;
      bookforedit.description = book.description;

      bookforedit
        .save()
        .then(() => res.json('Book updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Delete a book
router.route('/:id').delete(async (req, res) => {

  await Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});


module.exports = router;
