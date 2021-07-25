const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorHandler');
const bookRoutes = require('./routes/booksRoute');

const app = express();

app.enable('trust proxy');

// Development logging
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(cors());

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in hour!',
});
app.use('/api', limiter);

//  Body parser
app.use(express.json({ limit: '10kb' }));

// Data sanitize against XSS
app.use(xss());

// Data Sanitize against NoSQL query injection
app.use(mongoSanitize());

// Compression
app.use(compression());

// Routes
app.use("/api/v1/books", bookRoutes);

// Errors
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;