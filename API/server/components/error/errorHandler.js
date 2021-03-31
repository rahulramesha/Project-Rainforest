const Sequelize = require('sequelize');
const errorConstants = require('../../constants/errorConstants');

const processValidationErrors = (validation, errors, isUniqueConstraint = false) => {

    let validationErrors = validation ? validation : {};

    errors.forEach(( validationError, i, arr) => {

        const { message, path } = validationError;

        const messageKey = isUniqueConstraint ? errorConstants.NOT_UNIQUE: message;


        if (!validationErrors[path]) {
            validationErrors[path] = [];
        }

        validationErrors[path].push(messageKey);

    });

    return validationErrors;
}

module.exports = ( err, res ) => {
    let failureError = {};

    if(err instanceof Sequelize.UniqueConstraintError && err.errors.length > 0) {
        failureError.validationErrors = processValidationErrors({}, err.errors, true);
        res.status(400).json({ failureError });
    }
    if(err instanceof Sequelize.ValidationError && err.errors.length > 0) {
        failureError.validationErrors = processValidationErrors(failureError.validationErrors, err.errors);
        res.status(400).json({ failureError });
    } else if (err.isOperational) {
        if(err.field === errorConstants.GLOBAL)
            failureError.globalError = err.messageKey;
        else {
            failureError.validationErrors = {}
            failureError.validationErrors[err.field] = err.messageKey;
        }
        res.status(err.httpCode).json({ failureError });
    } else {
        console.log(err);
        res.sendStatus(500);
    }
}