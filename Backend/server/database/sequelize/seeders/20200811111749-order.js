'use strict';

const { MODEL_ORDER } = require('../sequelize_constants');
const id = require('../customIds')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      MODEL_ORDER,
      [
        {
          id: id.order1,
          price: '499',
          currency: 'INR',
          paymentMethod: 'POD',
          status: 'Delivered',
          customerId: id.customer1,
          sellerId: id.seller2,
          itemId: id.item23,
          pickupContact: JSON.stringify({
            name: 'Griffindore',
            address1: 'Hogwarts',
            city: 'Hogsmeade (You muggles will never get there)',
            pincode: 934,
            country: 'U.K',
            phoneNumber: 8765432906,
            countryCode: '+ 44',
            sellerId: id.seller2
          }),
          customerContact: JSON.stringify({
            name: 'Joanne',
            address1: 'Vidhaan Saudha',
            city: 'Bengaluru',
            pincode: 560001,
            country: 'India',
            phoneNumber: 7290778490,
            countryCode: '+ 91',
            customerId: id.customer1
          }),
        }
      ]
    )
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(MODEL_ORDER, null, {})
};
