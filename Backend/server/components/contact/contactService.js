const contactModel = require('../../database/sequelize/database/models').customerContact;
const AppError = require('../error/appError');
const errorConstants = require('../../constants/errorConstants');
  
class contactService {

    /**
     * @function getContactList
     * @async
     * @param {customerModel} customer 
     * @description retrieves contacts belonging to the customer
     * @returns {Array} array of contact values
     */
    async getContactList (customer) {
        const contactList = await customer.getContacts();
        const contactValues = contactList.map( contact => { 
            return {...contact.dataValues } 
        });
        return contactValues;
    }

    /**
     * @function createContact
     * @async
     * @param {customerModel} customer
     * @param {Object} options -  should have all the required fields to create a contact
     * @description creates a contact for the customer or throws error
     * @returns {Object} created contact values
     */
    async createContact (customer, options) {
        if(options) {
            const contact = await customer.createContact(options);
            return { ...contact.dataValues };
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function getContact
     * @async
     * @param {customerModel} customer
     * @param {Object} options -  should have contactId to be retrieved
     * @description retrieves requested contact values or throws error
     * @returns {Object} contact values
     */
    async getContact (customer, options) {
        if(options.contactId) {
            const contact = await customer.getContacts( { where: { id: options.contactId }});
            if(contact[0]) {
                return { ...contact[0].dataValues };
            } else throw new AppError(errorConstants.INVALID_INPUT, errorConstants.DATA_NOT_FOUND, true, 404);
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function updateContact
     * @async
     * @param {customerModel} customer
     * @param {Object} options -  should have contactId with the values to be updated
     * @description updates the contact
     * @return {Object} updated values
     */
    async updateContact (customer, options) {
        if(options.contactId) {
            const contact = await customer.getContacts( { where: { id: options.contactId }});
            if(contact[0]) {
                delete options.contactId;
                await contact[0].update(options);
                return { ...contact[0].dataValues };
            } else throw new AppError(errorConstants.INVALID_INPUT, errorConstants.DATA_NOT_FOUND, true, 404);
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function deleteContact
     * @async
     * @param {customerModel} customer
     * @param {Object} options -  should have contactId
     * @description updates the contact
     * @return {boolean} boolean
     */
    async deleteContact (customer, options) {
        if(options.contactId) {
            const contact = await contactModel.destroy({
                where: { 
                            id: options.contactId,
                            customerId: customer.id        
                }
            });
            return true;
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400)
    }

    
}

module.exports = contactService;