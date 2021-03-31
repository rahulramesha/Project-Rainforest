const sendErrorResponse = require('../error/errorHandler');
const contactService = require('./contactService');

const contactServiceInstance = new contactService();

module.exports.getContactList = async (req, res) => {
    try {
        if(req.currentUser) {
            const contactList = await contactServiceInstance.getContactList(req.currentUser);
            res.status(200).json(contactList);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.createContact = async (req, res) => {
    try {
        if(req.currentUser) {
            const contact = await contactServiceInstance.createContact(req.currentUser, req.body);
            res.status(200).json(contact);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.getContact = async (req, res) => {
    try {
        if(req.currentUser) {
            const contact = await contactServiceInstance.getContact(req.currentUser, req.body);
            res.status(200).json(contact);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.updateContact = async (req, res) => {
    try {
        if(req.currentUser) {
            const contact = await contactServiceInstance.updateContact(req.currentUser, req.body);
            res.status(200).json(contact);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}

module.exports.deleteContact = async (req, res) => {
    try {
        if(req.currentUser) {
            const contact = await contactServiceInstance.deleteContact(req.currentUser, req.body);
            if (contact)
                res.sendStatus(200);
            else 
                res.sendStatus(500);
        } else res.redirect(401, '/login');
    } catch (err) {
        sendErrorResponse(err, res);
    }
}