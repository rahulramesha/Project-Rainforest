'use strict';

const { MODEL_PICKUPCONTACT } = require('../sequelize_constants');
const id = require('../customIds')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      MODEL_PICKUPCONTACT,
      [
        {
          id: id.pickupContact11,
          name: 'Disney Land',
          address1: 'It\'s Disney land, Duh',
          city: 'LA',
          pincode: 9876,
          country: 'U.S.A',
          phoneNumber: 2468013579,
          countryCode: '+ 1',
          sellerId: id.seller1
        },
        {
          id: id.pickupContact21,
          name: 'Studio',
          address1: 'WB Studio',
          city: 'HollyWood',
          pincode: 9876,
          country: 'U.S.A',
          phoneNumber: 1111111111,
          countryCode: '+ 1',
          sellerId: id.seller2
        },
        {
          id: id.pickupContact22,
          name: 'Griffindore',
          address1: 'Hogwarts',
          city: 'Hogsmeade (You muggles will never get there)',
          pincode: 934,
          country: 'U.K',
          phoneNumber: 8765432906,
          countryCode: '+ 44',
          sellerId: id.seller2
        }
      ]
    )
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(MODEL_PICKUPCONTACT, null, {})
};
