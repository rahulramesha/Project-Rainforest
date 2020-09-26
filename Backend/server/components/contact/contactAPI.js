var express = require('express');
var path = require('path');

var contactController = require('./contactController');
var { auth } = require('../middleware/authentication');
const { authCache } = require('../middleware/redisCache');

var router = express.Router();

router.get('/contactsList', authCache, auth, contactController.getContactList);

router.put('/contact', authCache, auth, contactController.createContact);

router.get('/contact', authCache, auth, contactController.getContact);

router.patch('/contact', authCache, auth, contactController.updateContact);

router.delete('/contact', authCache, auth, contactController.deleteContact);

module.exports = router;