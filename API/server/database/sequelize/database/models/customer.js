'use strict';

const constants = require('../../sequelize_constants');
const errorConstants = require('../../../../constants/errorConstants');
const { countryCode } = require('../../enums');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Customer.hasMany(models[constants.MODEL_CONTACT], {
        as: 'contacts',
        onDelete: 'CASCADE',
      });

      Customer.hasMany(models[constants.MODEL_ORDER], {
        as: 'orders',
        onDelete: 'CASCADE',
      });

      Customer.hasMany(models[constants.MODEL_REVIEW], {
        as: 'reviews',
        onDelete: 'SET NULL',
      });

    }
  };
  Customer.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isAlpha: { arg: true, msg: errorConstants.NOT_ALPHABETIC},
        len: { args: [3, 128], msg: errorConstants.MIN_REQ_LENGTH + '3'}
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: { arg: true, msg: errorConstants.NOT_ALPHABETIC},
        len: [0, 128],
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isEmail: { arg: true, msg: errorConstants.NOT_EMAIL},
        isLowercase: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY}
      }
    },
    profilePic: {
      type: DataTypes.STRING,
      validate: {
        isUrl: { args: [true], msg: errorConstants.NOT_URL}
      }
    },
    primaryPhoneNumber: {
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
      values: countryCode,
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isIn: { args: [countryCode], msg: errorConstants.NOT_IN_LIST}
      }
    },
    csrfSecret: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      } 
    },
    cartItemIds: {
      type: DataTypes.ARRAY(DataTypes.UUID)
    }
  }, {
    sequelize,
    modelName: constants.MODEL_CUSTOMER,
    freezeTableName: true
  });
  return Customer;
};