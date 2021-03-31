'use strict';

const constants = require('../../sequelize_constants');
const errorConstants = require('../../../../constants/errorConstants');
const { country, countryCode } = require('../../enums');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contact.belongsTo(models[constants.MODEL_CUSTOMER]);

    }
  };
  Contact.init({
    id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    autoIncrement: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isAlpha: { arg: true, msg: errorConstants.NOT_ALPHABETIC},
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        len: { args: [1, 128], msg: errorConstants.MIN_REQ_LENGTH + '1'},
      }
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        len: { args: [3, 256], msg: errorConstants.MIN_REQ_LENGTH + '3'}
      }
    },
    address2: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 256]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        len: { args: [1, 64], msg: errorConstants.MIN_REQ_LENGTH}
      }
    },
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isNumeric: { args: [true], msg: errorConstants.NOT_NUMERIC},
        len: { args: [1, 10], msg: errorConstants.NOT_REQ_LENGTH}
      }
    },
    country: {
      type: DataTypes.ENUM,
      values: country,
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isIn: { args: [country], msg: errorConstants.NOT_IN_LIST}
      }
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isNumeric: { args: [true], msg: errorConstants.NOT_NUMERIC},
        len: { args: [5, 12], msg: errorConstants.NOT_REQ_LENGTH}
      }
    },
    countryCode: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: countryCode,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isIn: { args: [countryCode], msg: errorConstants.NOT_IN_LIST}
      }
    }
  }, {
    sequelize,
    modelName: constants.MODEL_CONTACT,
    freezeTableName: true
  });
  return Contact;
};