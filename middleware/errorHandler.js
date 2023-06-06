const { contants } = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case contants.VALIDATION_ERROR:
            res.json({ title: 'Validation Faieled', message: err.message, stackTrace: err.stack });
            break;
        case contants.NOT_FOUND:
            res.json({ title: 'Not Found', message: err.message, stackTrace: err.stack });
        case contants.FORBIDDEN:
            res.json({ title: 'Forbidden', message: err.message, stackTrace: err.stack });
            break;
        case contants.UNAUTHORIZED:
            res.json({ title: 'Un autherized', message: err.message, stackTrace: err.stack });
            break;
        case contants.SERVER_ERROR:
            res.json({ title: 'Server Error', message: err.message, stackTrace: err.stack });
            break;
        default:
            console.log('No Error');
            break;
    }
};

module.exports = errorHandler;
