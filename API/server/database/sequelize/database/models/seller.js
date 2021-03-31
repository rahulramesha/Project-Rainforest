'use strict';

const constants = require('../../sequelize_constants');
const errorConstants = require('../../../../constants/errorConstants');
const { countryCode } = require('../../enums');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Seller.hasMany(models[constants.MODEL_ITEM], {
        as: 'items',
        onDelete: 'CASCADE'
      });

      Seller.hasMany(models[constants.MODEL_PICKUPCONTACT], {
        as: 'pickupContacts',
        onDelete: 'CASCADE'
      });
    }

  };
  Seller.init({
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
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isAlpha: { arg: true, msg: errorConstants.NOT_ALPHABETIC},
        len: { args: [1, 256], msg: errorConstants.MIN_REQ_LENGTH + '1'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY}
      } 
    },
  }, {
    sequelize,
    modelName: constants.MODEL_SELLER,
    freezeTableName: true
  });
  return Seller;
};