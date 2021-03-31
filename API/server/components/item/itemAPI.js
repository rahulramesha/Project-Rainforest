var express = require('express');
var path = require('path');

const itemController = require('./itemController');
var { auth } = require('../middleware/authentication');
const { authCache } = require('../middleware/redisCache');

var router = express.Router();

router.get('/cart', authCache, auth, itemController.getCartItems);

router.get('/filteredItems', itemController.getFilteredItems);

router.get('/myitems', authCache, auth, itemController.getMyItems);

router.put('/item', authCache, auth, itemController.createItem);

router.get('/item', itemController.getItem);

router.patch('/item', authCache, auth, itemController.updateItem);

router.delete('/item', authCache, auth, itemController.deleteItem);

module.exports = router;