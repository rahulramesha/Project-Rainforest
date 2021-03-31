'use strict';

const { MODEL_REVIEW, MODEL_ITEM, MODEL_CUSTOMER } = require('../sequelize_constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      MODEL_REVIEW, 
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
        rating: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        customerImages: Sequelize.ARRAY(Sequelize.TEXT),
        purchaseVerified: Sequelize.BOOLEAN,
        customerId: {
          type: Sequelize.UUID,
          references: {
            model: MODEL_CUSTOMER, 
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        itemId: {
          type: Sequelize.UUID,
          references: {
            model: MODEL_ITEM, 
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
    return queryInterface.dropTable(MODEL_REVIEW);
  }
};
