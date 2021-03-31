'use strict';

const { MODEL_CONTACT, MODEL_CUSTOMER } = require('../sequelize_constants');
const { country, countryCode } = require('../enums');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      MODEL_CONTACT, 
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
        address1: {
          type: Sequelize.STRING,
          allowNull: false
        },
        address2: Sequelize.STRING,
        city: {
          type: Sequelize.STRING,
          allowNull: false
        },
        pincode: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        country: {
          type: Sequelize.ENUM,
          values: country,
          defaultValue: country[0]
        },
        phoneNumber: {
          type: Sequelize.BIGINT,
          allowNull: false
        },
        countryCode: {
          type: Sequelize.ENUM,
          values: countryCode,
          defaultValue: countryCode[0]
        },
        customerId: {
          type: Sequelize.UUID,
          references: {
            model: MODEL_CUSTOMER, 
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
    return queryInterface.dropTable(MODEL_CONTACT);
  }
};
