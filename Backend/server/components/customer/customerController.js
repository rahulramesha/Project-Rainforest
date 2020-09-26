const { setCookies, clearCookies } = require('../middleware/authentication');
const sendErrorResponse = require('../error/errorHandler');
const customerService = require('./customerService');

const customerServiceInstance = new customerService();


module.exports.localLogin = async (req, res) => {
    try {
        let customer = await customerServiceInstance.login(req.body);
        if(customer) {
            setCookies(customer, res);
            res.status(200).json(customerServiceInstance.hideSensitiveInfo(customer));
        }
    } catch(err) {
        sendErrorResponse(err, res);
    }
};

module.exports.signup = async (req, res) => {
    try {
        const customer = await customerServiceInstance.createCustomer(req.body);
        if(customer) {
            setCookies(customer, res);
            res.status(201).json(customerServiceInstance.hideSensitiveInfo(customer));
        } else res.sendStatus(500);
    } catch(err) {
        sendErrorResponse(err, res);
    }
};

module.exports.logout = (req, res) => {
    if(req.currentUser) {
        clearCookies(res);
    }
    res.redirect(200, '/login');
};

module.exports.getProfile = (req, res) => {
    if(req.currentUser)
        res.status(200).json(customerServiceInstance.hideSensitiveInfo(req.currentUser));
    else res.redirect(401, '/login');
};

module.exports.logoutOtherDevices = async (req, res) => {
    try{
        if(req.currentUser) {
            const customer = await customerServiceInstance.updatecsrfSecret(req.currentUser);
            setCookies(customer, res);
            res.status(200).json(customerServiceInstance.hideSensitiveInfo(customer));
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.delete = async (req, res) => {
    try {
        if(req.currentUser) {
            const customer = await customerServiceInstance.deleteCustomer(req.currentUser);
            if(customer) {
                res.redirect(200, '/login');
            } else res.sendStatus(500);
        } else res.redirect(401, '/login');
    } catch(err) {
        sendErrorResponse(err, res);
    }
};

