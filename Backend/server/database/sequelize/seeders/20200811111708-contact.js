'use strict';

const { MODEL_CONTACT } = require('../sequelize_constants');
const id = require('../customIds')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      MODEL_CONTACT,
      [
        {
          id: id.customerContact11,
          name: 'Home',
          address1: '1, Pensyllvania avenue',
          address2: 'The White house',
          city: 'Washington DC',
          pincode: 404,
          country: 'U.S.A',
          phoneNumber: 2345678921,
          countryCode: '+ 1',
          customerId: id.customer1
        },
        {
          id: id.customerContact12,
          name: 'Work',
          address1: 'Capitol Hill',
          city: 'Washington DC',
          pincode: 404,
          country: 'U.S.A',
          phoneNumber: 1111111111,
          countryCode: '+ 1',
          customerId: id.customer1
        },
        {
          id: id.customerContact21,
          name: 'House',
          address1: 'Adrress of Jane',
          city: 'London',
          pincode: 1234,
          country: 'U.K',
          phoneNumber: 8729108478,
          countryCode: '+ 44',
          customerId: id.customer2
        },
        {
          id: id.customerContact31,
          name: 'Work',
          address1: 'Adrress of Jake',
          city: 'Washington DC',
          pincode: 404,
          country: 'U.S.A',
          phoneNumber: 2345678921,
          countryCode: '+ 1',
          customerId: id.customer3
        },
        {
          id: id.customerContact32,
          name: 'Dad\'s house',
          address1: '1, Pensyllvania avenue',
          address2: 'The White house',
          city: 'Washington DC',
          pincode: 404,
          country: 'U.S.A',
          phoneNumber: 2345678921,
          countryCode: '+ 1',
          customerId: id.customer3
        },
        {
          id: id.customerContact41,
          name: 'Joanne',
          address1: 'Vidhaan Saudha',
          city: 'Bengaluru',
          pincode: 560001,
          country: 'India',
          phoneNumber: 7290778490,
          countryCode: '+ 91',
          customerId: id.customer4
        }
      ]
    )
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(MODEL_CONTACT, null, {})
};
