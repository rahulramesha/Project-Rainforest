'use strict';

const constants = require('../../sequelize_constants');
const errorConstants = require('../../../../constants/errorConstants');
const { currency, paymentMethod, orderStatus } = require('../../enums');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Order.belongsTo(models[constants.MODEL_CUSTOMER]);

      Order.belongsTo(models[constants.MODEL_SELLER]);

      Order.belongsTo(models[constants.MODEL_ITEM]);

    }
  };
  Order.init({
    id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    autoIncrement: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isNumeric: { args: [true], msg: errorConstants.NOT_NUMERIC}
      }
    },
    currency: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: currency,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isIn: { args: [currency], msg: errorConstants.NOT_IN_LIST}
      }
    },
    paymentMethod: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: paymentMethod,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isIn: { args: [paymentMethod], msg: errorConstants.NOT_IN_LIST}
      }
    },
    status: {
      type: DataTypes.ENUM,
      values: orderStatus,
      defaultValue: orderStatus[0],
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isIn: { args: [orderStatus], msg: errorConstants.NOT_IN_LIST}
      }
    },
    customerContact: { 
      type: DataTypes.JSON,
      allowNull: false
    },
    pickupContact: DataTypes.JSON
  }, {
    sequelize,
    modelName: constants.MODEL_ORDER,
    freezeTableName: true
  });
  return Order;
};