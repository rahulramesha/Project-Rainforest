const sendErrorResponse = require('../error/errorHandler');
const itemService = require('./itemService');

const itemServiceInstance = new itemService();

module.exports.getCartItems = async (req, res) => {
    try {
        if(req.currentUser && !req.isSeller) {
            const cartItems = await itemServiceInstance.getCartItems(req.currentUser);
            res.status(200).json(cartItems);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.getFilteredItems = async (req, res) => {
    try {
        const itemList = await itemServiceInstance.getFilteredItems(req.query);
        res.status(200).json(itemList);
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.getMyItems = async (req, res) => {
    try {
        if(req.currentUser && req.isSeller) {
            const itemsList = await itemServiceInstance.getMyItems(req.currentUser);
            res.status(200).json(itemsList)
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    } 
}

module.exports.createItem = async (req, res) => {
    try {
        if(req.currentUser && req.isSeller) {
            const item = await itemServiceInstance.createItem(req.currentUser, req.body);
            res.status(200).json(item);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }      
}

module.exports.getItem = async (req, res) => {
    try {
        const item = await itemServiceInstance.getItem(req.query);
        res.status(200).json(item);
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.updateItem = async (req, res) => {
    try {
        if(req.currentUser && req.isSeller) {
            const item = await itemServiceInstance.updateItem(req.currentUser, req.body);
            res.status(200).json(item);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    } 
}

module.exports.deleteItem = async (req, res) => {
    try {
        if(req.currentUser && req.isSeller) {
            const item = await itemServiceInstance.deleteItem(req.currentUser, req.body);
            res.sendStatus(200);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    } 
}