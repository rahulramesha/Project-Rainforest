'use strict';

const short = require('short-uuid');

const { MODEL_SELLER } = require('../sequelize_constants');
const id = require('../customIds')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      MODEL_SELLER,
      [
        {
          id: id.seller1,
          name: 'Marvel',
          email: 'shopping@disney.com',
          password: '$2b$10$Pl6dROmLqxfYiLlHjrZhv.5hgI9yg.7bYBlz1/7Og5s8gBfSgN86a',
          primaryPhoneNumber: 2468013579,
          countryCode: '+ 1',
          csrfSecret: short.generate()
        },
        {
          id: id.seller2,
          name: 'Warner Bros',
          email: 'shopping@wb.com',
          password: '$2b$10$Pl6dROmLqxfYiLlHjrZhv.5hgI9yg.7bYBlz1/7Og5s8gBfSgN86a',
          primaryPhoneNumber: 8765432906,
          countryCode: '+ 44',
          csrfSecret: short.generate()
        }
      ]
    )
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(MODEL_SELLER, null, {})
};
