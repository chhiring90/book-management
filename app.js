const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorHandler');
const bookRoutes = require('./routes/booksRoute');

const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

//  Body parser
app.use(express.json({ limit: '10kb' }));

app.use(xss());

// Routes
app.use("/api/v1/books", bookRoutes);

// Errors

app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;