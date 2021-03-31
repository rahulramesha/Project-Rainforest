var express = require('express');
var path = require('path');

var sellerContactController = require('./sellerContactController');
var { auth } = require('../middleware/authentication');
const { authCache } = require('../middleware/redisCache');

var router = express.Router();

router.get('/sellerContactsList', authCache, auth, sellerContactController.getSellerContactList);

router.put('/sellerContact', authCache, auth, sellerContactController.createSellerContact);

router.get('/sellerContact', authCache, auth, sellerContactController.getSellerContact);

router.patch('/sellerContact', authCache, auth, sellerContactController.updateSellerContact);

router.delete('/sellerContact', authCache, auth, sellerContactController.deleteSellerContact);

module.exports = router;