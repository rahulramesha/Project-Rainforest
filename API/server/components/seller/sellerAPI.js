var express = require('express');
var path = require('path');

var sellerController = require('./sellerController');
var { auth } = require('../middleware/authentication');
const { authCache } = require('../middleware/redisCache');

var router = express.Router();

router.post('/sellerLogin', sellerController.sellerLogin);

router.put('/sellerSignup', sellerController.sellerSignup);

router.post('/sellerLogout', authCache, auth, sellerController.sellerLogout);

router.get('/sellerProfile', authCache, auth, sellerController.getSellerProfile);

router.patch('/sellerLogoutOtherDevices', authCache, auth, sellerController.sellerLogoutOtherDevices);

router.delete('/sellerDelete', authCache, auth, sellerController.sellerDelete);

router.get('/sellerLogin', (req, res) => {
    res.sendFile(path.resolve('server/public/login.html'));
});

router.get('/sellerSignup', (req, res) => {
    res.sendFile(path.resolve('server/public/signup.html'));
});

module.exports = router;