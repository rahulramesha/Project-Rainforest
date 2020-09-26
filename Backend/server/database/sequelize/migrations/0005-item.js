'use strict';

const { MODEL_ITEM, MODEL_SELLER } = require('../sequelize_constants');
const { currency, itemCategories } = require('../enums');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      MODEL_ITEM, 
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          autoIncrement: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        itemImages: Sequelize.ARRAY(Sequelize.TEXT),
        price: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        avgRating: Sequelize.FLOAT,
        numRatings: Sequelize.INTEGER,
        currency:  {
          type: Sequelize.ENUM,
          values: currency,
          defaultValue: currency[0]
        },
        category: {
          type: Sequelize.ENUM,
          values: itemCategories,
          defaultValue: itemCategories[0]
        },
        sellerId: {
          type: Sequelize.UUID,
          references: {
            model: MODEL_SELLER, 
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(MODEL_ITEM);
  }
};
