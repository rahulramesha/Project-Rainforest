const Sequelize = require('sequelize');
const errorConstants = require('../../constants/errorConstants');

const processValidationErrors = (errors, isUniqueConstraint = false) => {

    let validationErrors = [];
    let validation = {
        errors: []
    };

    errors.forEach(( validationError, i, arr) => {
        let error = {};

        if (!validation.field) {
            validation.field = validationError.path;
        }
        
        if ( validation.field === validationError.path) {
            if(isUniqueConstraint) error.messageKey = errorConstants.NOT_UNIQUE;
            else error.messageKey = validationError.message;
            error.method = validationError.validatorKey;
            validation.errors.push(error);
        } else {
            validationErrors.push({ ...validation });
            validation.field = validationError.path;
            validation.errors = [];
            if(isUniqueConstraint) error.messageKey = errorConstants.NOT_UNIQUE;
            else error.messageKey = validationError.message;
            error.method = validationError.validatorKey;
            validation.errors.push(error);
        }

        if (i === arr.length -1 ) {
            validationErrors.push({ ...validation });
        }

    });

    return validationErrors;
}

module.exports = ( err, res ) => {
    let failureError = {
        validationErrors: []
    };

    if(err instanceof Sequelize.UniqueConstraintError && err.errors.length > 0) {
        failureError.validationErrors.push(processValidationErrors(err.errors, true));
        res.status(400).json({ failureError });
    }
    if(err instanceof Sequelize.ValidationError && err.errors.length > 0) {
        failureError.validationErrors.push(processValidationErrors(err.errors));
        res.status(400).json({ failureError });
    } else if (err.isOperational) {
        failureError.validationErrors.push(err.getErrorObject());
        res.status(err.httpCode).json({ failureError });
    } else {
        console.log(err);
        res.sendStatus(500);
    }
}