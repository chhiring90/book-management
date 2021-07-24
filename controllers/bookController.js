const Book = require('../models/bookModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllBooks = catchAsync(async (req, res, next) => {
    const books = await Book.find();

    res.status(200).json({
        status: 'success',
        results: books.length,
        data: {
            data: books
        }
    });
});

exports.getBook = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    if (!book) return next(new AppError('No doc found with that ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: book
        }
    });
})

exports.createBook = catchAsync(async (req, res, next) => {
    const book = await Book.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: book
        }
    });
});

exports.updateBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            data: book
        }
    })
})

exports.deleteBook = catchAsync(async (req, res, next) => {
    await Book.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success'
    });
});