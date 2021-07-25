const Book = require('../models/bookModel');
const { getAll, getOne, createOne, updateOne, deleteOne } = require('./factoryHandler');

exports.getAllBooks = getAll(Book);
exports.getBook = getOne(Book);
exports.createBook = createOne(Book);
exports.updateBook = updateOne(Book);
exports.deleteBook = deleteOne(Book);