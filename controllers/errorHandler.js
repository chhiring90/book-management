const AppError = require('../utils/appError');

const handleCastErrorDB = (err, req, res) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}

const handleDuplicationErrorDB = (err, req, res) => {
    let message = err.message.match(/{([^}]*)}/)[0];
    message = `Duplicate Value ${message.slice(1, message.length - 1).trim().toUpperCase()}. Please use another value.`;
    return new AppError(message, 400);
}

const handleValidationErrorDB = (err, req, res) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data: ${errors.join('. ')}`;
    return new AppError(message, 400);
}

const sendErrorDev = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    });
}

const sendErrorProd = (err, req, res) => {

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'production') {
        let error = Object.create(err);
        if (error.name === 'CastError') error = handleCastErrorDB(error, req, res);
        if (error.code === 11000) error = handleDuplicationErrorDB(error, req, res);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error, req, res);
        sendErrorProd(error, req, res);
    } else {
        sendErrorDev(err, req, res);
    }
}