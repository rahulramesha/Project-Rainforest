'use strict';

const validator = require('validator');

const constants = require('../../sequelize_constants');
const errorConstants = require('../../../../constants/errorConstants');
const { currency, itemCategories } = require('../../enums');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Item.belongsTo(models[constants.MODEL_SELLER]);

      Item.hasMany(models[constants.MODEL_REVIEW], {
        as: 'reviews',
        onDelete: 'CASCADE',
      });
    }
  };
  Item.init({
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
        len: { args: [3, 128], msg: errorConstants.MIN_REQ_LENGTH + '3'},
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        len: { args: [3, 1024], msg: errorConstants.MIN_REQ_LENGTH + '3'},
      }
    },
    itemImages: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      validate: {
        isUrls: function(val) {
          if (!value) return value;

            var values = (Array.isArray(value)) ? value : [value];

            values.forEach(function(val) {
                if (!validator.isURL(val)) {
                    throw new Error("itemImages: " + errorConstants.NOT_URL);
                }
            });
            return value;
        }
      }
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
    avgRating: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: { args: [true], msg: errorConstants.NOT_NUMERIC},
        min: 1,
        max: 5
      }
    },
    numRatings: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    currency: {
      type: DataTypes.ENUM,
      values: currency,
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isIn: { args: [currency], msg: errorConstants.NOT_IN_LIST}
      }
    },
    category: {
      type: DataTypes.ENUM,
      values: itemCategories,
      allowNull: false,
      validate: {
        notNull: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        notEmpty: { args: [true], msg: errorConstants.NULL_OR_EMPTY},
        isIn: { args: [itemCategories], msg: errorConstants.NOT_IN_LIST}
      }
    }
  }, {
    sequelize,
    modelName: constants.MODEL_ITEM,
    freezeTableName: true
  });
  return Item;
};