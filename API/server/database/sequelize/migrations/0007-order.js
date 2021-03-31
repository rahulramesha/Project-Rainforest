'use strict';

const { 
  MODEL_ORDER, 
  MODEL_ITEM, 
  MODEL_CUSTOMER, 
  MODEL_CONTACT, 
  MODEL_PICKUPCONTACT,
  MODEL_SELLER } = require('../sequelize_constants');
const { currency, paymentMethod, orderStatus } = require('../enums');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      MODEL_ORDER, 
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          autoIncrement: false
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        currency: {
          type: Sequelize.ENUM,
          values: currency,
          defaultValue: currency[0]
        },
        paymentMethod: {
          type: Sequelize.ENUM,
          values: paymentMethod,
          defaultValue: paymentMethod[0]
        },
        status: {
          type: Sequelize.ENUM,
          values: orderStatus,
          defaultValue: orderStatus[0]
        },
        customerId: {
          type: Sequelize.UUID,
          references: {
            model: MODEL_CUSTOMER,
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        sellerId: {
          type: Sequelize.UUID,
          references: {
            model: MODEL_SELLER,
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        itemId: {
          type: Sequelize.UUID,
          references: {
            model: MODEL_ITEM,
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        customerContact: {
          type: Sequelize.JSON,
          allowNull: false
        },
        pickupContact: {
          type: Sequelize.JSON,
          allowNull: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(MODEL_ORDER);
  }
};
