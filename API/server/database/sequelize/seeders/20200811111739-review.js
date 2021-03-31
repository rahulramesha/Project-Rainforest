'use strict';

const { MODEL_REVIEW } = require('../sequelize_constants');
const id = require('../customIds')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      MODEL_REVIEW,
      [
        {
          id: id.review11_22,
          name: 'Best Wand Ever',
          description: 'Shined a yellowish light when i picked it up the first time',
          rating: 4,
          purchaseVerified: false,
          customerId: id.customer1,
          itemId: id.item22
        },
        {
          id: id.review21_22,
          name: 'Fake Pheonix feather',
          description: 'It doesnt even have a waranty on it',
          rating: 1,
          purchaseVerified: true,
          customerId: id.customer2,
          itemId: id.item22
        },
        {
          id: id.review41_12,
          name: 'I am Inevitable',
          description: 'I am Ironman',
          rating: 5,
          purchaseVerified: true,
          customerId: id.customer4,
          itemId: id.item12
        },
        {
          id: id.review42_23,
          name: 'IDK',
          description: 'I really dont know',
          rating: 3,
          purchaseVerified: true,
          customerId: id.customer4,
          itemId: id.item23
        }
      ]
    )
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(MODEL_REVIEW, null, {})
};
