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
          category: 'Kitchen',
          sellerId: id.seller2
        },
      ]
    )
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete(MODEL_ITEM, null, {})
};
