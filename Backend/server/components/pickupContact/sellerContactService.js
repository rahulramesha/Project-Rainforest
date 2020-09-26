const sellerContactModel = require('../../database/sequelize/database/models').pickupContact;
const AppError = require('../error/appError');
const errorConstants = require('../../constants/errorConstants');
  
class sellerContactService {

    /**
     * @function getSellerContactList
     * @async
     * @param {sellerModel} seller 
     * @description retrieves contacts belonging to the seller
     * @returns {Array} array of contact values
     */
    async getSellerContactList (seller) {
        const sellerContactList = await seller.getPickupContacts();
        const contactValues = sellerContactList.map( sellerContact => { 
            return {...sellerContact.dataValues } 
        });
        return contactValues;
    }

    /**
     * @function createSellerContact
     * @async
     * @param {sellerModel} seller
     * @param {Object} options -  should have all the required fields to create a contact
     * @description creates a contact for the seller or throws error
     * @returns {Object} created contact values
     */
    async createSellerContact (seller, options) {
        if(options) {
            const sellerContact = await seller.createPickupContact(options);
            return { ...sellerContact.dataValues };
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function getSellerContact
     * @async
     * @param {sellerModel} seller
     * @param {Object} options -  should have sellerContactId to be retrieved
     * @description retrieves requested contact values or throws error
     * @returns {Object} contact values
     */
    async getSellerContact (seller, options) {
        if(options.sellerContactId) {
            const sellerContact = await seller.getPickupContacts( { where: { id: options.sellerContactId }});
            if(sellerContact[0]) {
                return { ...sellerContact[0].dataValues };
            } else throw new AppError(errorConstants.INVALID_INPUT, errorConstants.DATA_NOT_FOUND, true, 404);
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function updateSellerContact
     * @async
     * @param {sellerModel} seller
     * @param {Object} options -  should have sellerContactId with the values to be updated
     * @description updates the contact
     * @return {Object} updated values
     */
    async updateSellerContact (seller, options) {
        if(options.sellerContactId) {
            const sellerContact = await seller.getPickupContacts( { where: { id: options.sellerContactId }});
            if(sellerContact[0]) {
                delete options.sellerContactId;
                await sellerContact[0].update(options);
                return { ...sellerContact[0].dataValues };
            } else throw new AppError(errorConstants.INVALID_INPUT, errorConstants.DATA_NOT_FOUND, true, 404);
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function deleteSellerContact
     * @async
     * @param {sellerModel} seller
     * @param {Object} options -  should have sellerContactId
     * @description updates the contact
     * @return {boolean} boolean
     */
    async deleteSellerContact (seller, options) {
        if(options.sellerContactId) {
            const sellerContact = await sellerContactModel.destroy({
                where: { 
                            id: options.sellerContactId,
                            sellerId: seller.id        
                }
            });
            return true;
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    
}

module.exports = sellerContactService;