'use strict';

const { MODEL_ITEM } = require('../sequelize_constants');
const id = require('../customIds')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      MODEL_ITEM,
      [
        {
          id: id.item11,
          name: 'Iron man Pop',
          description: 'Action Figure',
          itemImages: ['https://ae01.alicdn.com/kf/HTB1fs7NUSzqK1RjSZFjq6zlCFXas/FUNKO-POP-Marvel-Avengers-Endgame-TONY-STARK-226-Vinyl-Action-Figure-Iron-Man-Collection-Model-Toy.jpg_q50.jpg'],
          price: 5.89,
          currency: 'USD',
          category: 'Entertainment',
          sellerId: id.seller1
        },
        {
          id: id.item12,
          name: 'Avengers Bluray',
          description: 'Avengers Endgame Bluray',
          price: 37,
          avgRating: 4,
          numRatings: 1,
          currency: 'USD',
          category: 'Entertainment',
          sellerId: id.seller1
        },
        {
          id: id.item13,
          name: 'Pressure Cooker',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          itemImages: [
                        'https://images-na.ssl-images-amazon.com/images/I/61CW%2BpcfnoL._SL1500_.jpg',
                        'https://images-na.ssl-images-amazon.com/images/I/71%2B1YBhN7FL._SL1500_.jpg',
                        'https://images-na.ssl-images-amazon.com/images/I/61G3PId2XSL._SL1500_.jpg',
                        'https://images-na.ssl-images-amazon.com/images/I/71lYAOHnZ9L._SL1500_.jpg',
                        'https://images-na.ssl-images-amazon.com/images/I/71cO5qxVf-L._SL1500_.jpg',
                        'https://images-na.ssl-images-amazon.com/images/I/71--NMPqUvL._SL1500_.jpg'
                      ],
          price: 1000,
          avgRating: 4.2,
          numRatings: 565,
          currency: 'USD',
          category: 'Kitchen',
          sellerId: id.seller1
        },
        {
          id: id.item21,
          name: 'Justice League Bluray',
          description: 'Best Movie LOL',
          price: 5,
          currency: 'GBP',
          category: 'Entertainment',
          sellerId: id.seller2
        },
        {
          id: id.item22,
          name: 'Harry\'s Wand',
          description: 'Expecto Patronum',
          price: 7.4,
          avgRating: 4.5,
          numRatings: 2,
          currency: 'GBP',
          category: 'Entertainment',
          sellerId: id.seller2
        },
        {
          id: id.item23,
          name: 'IDK',
          description: 'i Dont know',
          price: 499,
          category: 'Entertainment',
          sellerId: id.seller2
        },
      ]
    )
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(MODEL_ITEM, null, {})
};
