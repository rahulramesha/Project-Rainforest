const { setCookies, clearCookies } = require('../middleware/authentication');
const sendErrorResponse = require('../error/errorHandler');
const sellerService = require('./sellerService');

const sellerServiceInstance = new sellerService();


module.exports.sellerLogin = async (req, res) => {
    try {
        let seller = await sellerServiceInstance.sellerLogin(req.body);
        if(seller) {
            setCookies(seller, res, true);
            res.status(200).json(sellerServiceInstance.hideSensitiveInfo(seller));
        }
    } catch(err) {
        sendErrorResponse(err, res);
    }
};

module.exports.sellerSignup = async (req, res) => {
    try {
        const seller = await sellerServiceInstance.createSeller(req.body);
        if(seller) {
            setCookies(seller, res, true);
            res.status(201).json(sellerServiceInstance.hideSensitiveInfo(seller));
        } else res.sendStatus(500);
    } catch(err) {
        sendErrorResponse(err, res);
    }
};

module.exports.sellerLogout = (req, res) => {
    if(req.currentUser) {
        clearCookies(res);
    }
    res.redirect(200, '/login');
};

module.exports.getSellerProfile = (req, res) => {
    if(req.currentUser)
        res.status(200).json(sellerServiceInstance.hideSensitiveInfo(req.currentUser));
    else res.redirect(401, '/login');
};

module.exports.sellerLogoutOtherDevices = async (req, res) => {
    try{
        if(req.currentUser) {
            const seller = await sellerServiceInstance.updatecsrfSecret(req.currentUser);
            setCookies(seller, res, true);
            res.status(200).json(sellerServiceInstance.hideSensitiveInfo(seller));
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.sellerDelete = async (req, res) => {
    try {
        if(req.currentUser) {
            const seller = await sellerServiceInstance.deleteSeller(req.currentUser);
            if(seller) {
                res.redirect(200, '/login');
            } else res.sendStatus(500);
        } else res.redirect(401, '/login');
    } catch(err) {
        sendErrorResponse(err, res);
    }
};

