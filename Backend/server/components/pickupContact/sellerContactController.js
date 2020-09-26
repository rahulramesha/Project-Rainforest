const sendErrorResponse = require('../error/errorHandler');
const sellerContactService = require('./sellerContactService');

const sellerContactServiceInstance = new sellerContactService();

module.exports.getSellerContactList = async (req, res) => {
    try {
        if(req.currentUser) {
            const sellerContactList = await sellerContactServiceInstance.getSellerContactList(req.currentUser);
            res.status(200).json(sellerContactList);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.createSellerContact = async (req, res) => {
    try {
        if(req.currentUser) {
            const sellerContact = await sellerContactServiceInstance.createSellerContact(req.currentUser, req.body);
            res.status(200).json(sellerContact);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.getSellerContact = async (req, res) => {
    try {
        if(req.currentUser) {
            const sellerContact = await sellerContactServiceInstance.getSellerContact(req.currentUser, req.body);
            res.status(200).json(sellerContact);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.updateSellerContact = async (req, res) => {
    try {
        if(req.currentUser) {
            const sellerContact = await sellerContactServiceInstance.updateSellerContact(req.currentUser, req.body);
            res.status(200).json(sellerContact);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.deleteSellerContact = async (req, res) => {
    try {
        if(req.currentUser) {
            const sellerContact = await sellerContactServiceInstance.deleteSellerContact(req.currentUser, req.body);
            if (sellerContact)
                res.sendStatus(200);
            else 
                res.sendStatus(500);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}