'use strict';

const short = require('short-uuid');

const { MODEL_CUSTOMER } = require('../sequelize_constants');
const id = require('../customIds');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      MODEL_CUSTOMER,
      [
        {
          id: id.customer1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'John@example.com',
          password: '$2b$10$Pl6dROmLqxfYiLlHjrZhv.5hgI9yg.7bYBlz1/7Og5s8gBfSgN86a',
          primaryPhoneNumber: 1111111111,
          countryCode: '+ 1',
          csrfSecret: short.generate()
        },
        {
          id: id.customer2,
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'Jane@example.com',
          password: '$2b$10$Pl6dROmLqxfYiLlHjrZhv.5hgI9yg.7bYBlz1/7Og5s8gBfSgN86a',
          primaryPhoneNumber: 8729108478,
          countryCode: '+ 44',
          csrfSecret: short.generate()
        },
        {
          id: id.customer3,
          firstName: 'Jake',
          lastName: 'Doe',
          email: 'Jake@example.com',
          password: '$2b$10$Pl6dROmLqxfYiLlHjrZhv.5hgI9yg.7bYBlz1/7Og5s8gBfSgN86a',
          primaryPhoneNumber: 2345678921,
          countryCode: '+ 1',
          csrfSecret: short.generate()
        },
        {
          id: id.customer4,
          firstName: 'Joanne',
          lastName: 'Doe',
          email: 'Joanne@example.com',
          password: '$2b$10$Pl6dROmLqxfYiLlHjrZhv.5hgI9yg.7bYBlz1/7Og5s8gBfSgN86a',
          primaryPhoneNumber: 7290778490,
          countryCode: '+ 91',
          csrfSecret: short.generate()
        }
      ]
    )
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(MODEL_CUSTOMER, null, {})
};
