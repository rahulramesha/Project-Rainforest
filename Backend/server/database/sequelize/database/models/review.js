'use strict';

const constants = require('../../sequelize_constants');
const errorConstants = require('../../../../constants/errorConstants');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Review.belongsTo(models[constants.MODEL_CUSTOMER]);

      Review.belongsTo(models[constants.MODEL_ITEM]);

    }
  };
  Review.init({
    id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    autoIncrement: false
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 1,
        max: 5
      }
    },
    customerImages: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      validate: {
        isUrls: function(val) {
          if (!value) return value;

            var values = (Array.isArray(value)) ? value : [value];

            values.forEach(function(val) {
                if (!validator.isURL(val)) {
                    throw new Error("customerImages: " + errorConstants.NOT_URL);
                }
            });
            return value;
        }
      }
    },
    purchaseVerified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: constants.MODEL_REVIEW,
    freezeTableName: true
  });
  return Review;
};