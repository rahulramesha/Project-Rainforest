const Sequelize = require('sequelize');

const itemModel = require('../../database/sequelize/database/models').item;
const AppError = require('../error/appError');
const errorConstants = require('../../constants/errorConstants');

const Op = Sequelize.Op;

class itemService {

    /**
     * @function getCartItems
     * @async
     * @param {customerModel} customer
     * @description retrieves the items from the cart of customers
     * @returns {Array} array of item values
     */
    async getCartItems(customer) {
        if(customer.cartItemIds.length > 0) {
            const cartItems = await itemModel.findAll({
                where: {
                    id: customer.cartItemIds
                },
                attributes: ['id', 'name', 'itemImages', 'price', 'currency']
            });
            const cartItemsValues = cartItems.map(item => {
                return {...item.dataValues};
            });
            return cartItemsValues
        } else throw new AppError(errorConstants.INVALID_INPUT, errorConstants.CART_EMPTY, true, 404);
    }

    /**
     * @function getFilteredItems
     * @async
     * @param {Object} query - query params for filtering items
     * @description retrieves the items based on the filter
     * @returns {Array} array of item values
     */
    async getFilteredItems(query) {
        if(query.search || query.category) {
            let where = {
                [Op.or]: []
            };
            if(query.search) {
                where[Op.or].push({ 
                    name: {
                        [Op.iLike]: `%${query.search.replace(/ /g, '%')}%`
                        }
                });
                where[Op.or].push({ 
                    description: {
                        [Op.iLike]: `%${query.search.replace(/ /g, '%')}%`
                        }
                });
            }
            if(query.category) {
                where.category = query.category;
            }
            const itemList = await itemModel.findAll({
                limit: query.limit || 10,
                where,
                attributes: ['id', 'name', 'itemImages', 'price', 'currency']
            });
            if(itemList && itemList.length > 0) {
                const itemListValues = itemList.map(item => {
                    return { ...item.dataValues };
                });
                return itemListValues;
            } else throw new AppError(errorConstants.INVALID_INPUT, errorConstants.DATA_NOT_FOUND, true, 404);
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function getMyItems
     * @async
     * @param {sellerModel} seller 
     * @description retrieves items belonging to the seller
     * @returns {Array} array of item values
     */
    async getMyItems(seller) {
        const myItemList = await seller.getItems();
        if(myItemList && myItemList.length > 0) {
            const itemValues = myItemList.map( item => { 
                return {...item.dataValues } 
            });
            return itemValues;
        } else throw new AppError(errorConstants.INVALID_INPUT, errorConstants.DATA_NOT_FOUND, true, 404);
    }

    /**
     * @function createItem
     * @async
     * @param {sellerModel} seller
     * @param {Object} options -  should have all the required fields to create a item
     * @description creates a item for the seller or throws error
     * @returns {Object} created item values
     */
    async createItem(seller, options) {
        if(options) {
            const item = await seller.createItem(options);
            return { ...item.dataValues };
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function getItem
     * @async
     * @param {Object} options -  should have itemId to be retrieved
     * @description retrieves requested item values or throws error
     * @returns {Object} item values
     */
    async getItem(options) {
        if(options && options.itemId) {
            const item = await itemModel.findByPk(options.itemId);
            if(item) {
                return { ...item.dataValues };
            } else throw new AppError(errorConstants.INVALID_INPUT, errorConstants.DATA_NOT_FOUND, true, 404);
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function updateItem
     * @async
     * @param {customerModel} customer
     * @param {Object} options -  should have contactId with the values to be updated
     * @description updates the contact
     * @return {Object} updated values
     */
    async updateItem(seller, options) {
        if(options.itemId) {
            const item = await seller.getItems( { where: { id: options.itemId }});
            if(item[0]) {
                delete options.itemId;
                await item[0].update(options);
                return { ...item[0].dataValues };
            } else throw new AppError(errorConstants.INVALID_INPUT, errorConstants.DATA_NOT_FOUND, true, 404);
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function deleteItem
     * @async
     * @param {sellerModel} seller
     * @param {Object} options -  should have itemId
     * @description updates the contact
     * @return {boolean} boolean
     */
    async deleteItem(seller, options) {
        if(options.itemId) {
            const item = await itemModel.destroy({
                where: { 
                            id: options.itemId,
                            sellerId: seller.id        
                }
            });
            return true;
        } else throw new AppError(errorConstants.INVALID_INPUT, errorConstants.DATA_NOT_FOUND, true, 404);
    }

}

module.exports = itemService;