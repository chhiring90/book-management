const sendErrorDev = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    });
}

const sendErrorProd = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}

module.exports = (err, req, res, next) => {

    if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, req, res);
    } else {
        sendErrorDev(err, req, res);
    }
}