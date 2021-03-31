var express = require('express');
var path = require('path');

const orderController = require('./orderController');
var { auth } = require('../middleware/authentication');
const { authCache } = require('../middleware/redisCache');

var router = express.Router();

router.get('/myOrders', authCache, auth, orderController.getMyOrders);

router.put('/order', authCache, auth, orderController.createOrder);

router.get('/order', authCache, auth, orderController.getOrder);

router.patch('/order', authCache, auth, orderController.updateOrder);

router.delete('/order', authCache, auth, orderController.deleteOrder);

module.exports = router;
