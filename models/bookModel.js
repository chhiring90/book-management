const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Book must have a name.'],
        minLength: [4, 'A Book must have a minimum length of 4 characters.'],
    },
    slug: String,
    isbn: {
        type: Number,
        required: [true, 'Book must have an ISBN number.'],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    toJSON: { virtual: true },
    toObject: { virtual: true }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;