const errorConstants = require("../../constants/errorConstants");

function AppError (name, messageKey, isOperational, httpCode, field = errorConstants.GLOBAL) {
      Error.call(this);
      Error.captureStackTrace(this);
      this.name = name;
      this.messageKey = messageKey;
      this.isOperational = isOperational;
      this.httpCode = httpCode;
      this.field = field;
};

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;
AppError.prototype.getErrorObject = function() {
      return {
            field: this.field,
            errors: [
                  {
                        messageKey: this.messageKey,
                        method: this.name
                  }
            ]
      }
}

module.exports = AppError;


