const express = require('express');
const path = require('path');

const customerController = require('./customerController');
const { auth } = require('../middleware/authentication');
const { authCache } = require('../middleware/redisCache');

const router = express.Router();

router.post('/localLogin', customerController.localLogin);

router.put('/signup', customerController.signup);

router.post('/logout', authCache, auth, customerController.logout);

router.get('/profile', authCache, auth, customerController.getProfile);

router.patch('/logoutOtherDevices', authCache, auth, customerController.logoutOtherDevices);

router.delete('/delete', authCache, auth, customerController.delete);

router.get('/login', (req, res) => {
    res.sendFile(path.resolve('server/public/login.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.resolve('server/public/signup.html'));
});

module.exports = router;