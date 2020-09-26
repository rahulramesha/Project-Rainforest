'use strict';

const { MODEL_CUSTOMER } = require('../sequelize_constants');
const { countryCode } = require('../enums');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      MODEL_CUSTOMER, 
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          autoIncrement: false
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true
        },
        csrfSecret: Sequelize.STRING,
        cartItemIds: Sequelize.ARRAY(Sequelize.UUID),
        profilePic: Sequelize.TEXT,
        primaryPhoneNumber: Sequelize.BIGINT,
        countryCode: {
          type: Sequelize.ENUM,
          values: countryCode
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(MODEL_CUSTOMER);
  }
};
