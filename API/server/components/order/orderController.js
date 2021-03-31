const sendErrorResponse = require('../error/errorHandler');
const orderService = require('./orderService');

const orderServiceInstance = new orderService();

module.exports.getMyOrders = async (req, res) => {
    try {
        if(req.currentUser) {
            const ordersList = await orderServiceInstance.getOrderList(req.currentUser);
            res.status(200).json(ordersList);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.createOrder = async (req, res) => {
    try {
        if(req.currentUser && !req.isSeller) {
            const order = await orderServiceInstance.createOrder(req.currentUser, req.body);
            res.status(200).json(order);
        } else if(req.isSeller) res.sendStatus(401);
        else  res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.getOrder = async (req, res) => {
    try {
        if(req.currentUser) {
            const order = await orderServiceInstance.getOrder(req.currentUser, req.body);
            res.status(200).json(order);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.updateOrder = async (req, res) => {
    try {
        if(req.currentUser) {
            const order = await orderServiceInstance.updateOrder(req.currentUser, req.body);
            res.status(200).json(order);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.deleteOrder = async (req, res) => {
    try {
        if(req.currentUser) {
            res.sendStatus(401);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}