const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures')

exports.getAll = Model => catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const docs = await features.query;

    res.status(200).json({
        status: 'success',
        results: docs.length,
        data: {
            data: docs
        }
    });
});

exports.getOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) return next(new AppError('No doc found with that ID', 404));

    console.log(doc);

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    });

    if(!doc) next(new AppError('Cannot updated doc with that ID', 400))

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success'
    });
});