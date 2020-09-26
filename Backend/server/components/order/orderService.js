const orderModel = require('../../database/sequelize/database/models').order;
const contactService = require('../contact/contactService');
const AppError = require('../error/appError');
const errorConstants = require('../../constants/errorConstants');

const contactServiceInstance = new contactService();

class orderService {
    
    /**
     * @function getOrderList
     * @async
     * @param {sellerModel/customerModel} user 
     * @description retrieves orders belonging to the seller/customer
     * @returns {Array} array of item values
     */
    async getOrderList (user) {
        const ordersList = await user.getOrders();
        if(ordersList.length > 0) {
            const ordersListValues = ordersList.map(order => {
                return { ...order.dataValues };
            });
            return ordersListValues;
        } else throw new AppError(errorConstants.INVALID_INPUT, errorConstants.DATA_NOT_FOUND, true, 404);
    }

    /**
     * @function createOrder
     * @async
     * @param {customerModel} customer
     * @param {Object} options -  should have all the required fields to create a order
     * @description creates a order for the customer or throws error
     * @returns {Object} created order values
     */
    async createOrder (customer, options) {
        if(options.orders && options.orders.length > 0 && options.contactId) {
            const customerContact = await contactServiceInstance.getContact(customer, { contactId: options.contactId });
            const ordersListInput = options.orders.map(order => {
                order.customerContact = customerContact;
                order.customerId = customer.id;
                return order;
            });
            const ordersList = await orderModel.bulkCreate(ordersListInput);
            const ordersListValues = ordersList.map(order => {
                return { ...order.dataValues };
            });
            return ordersListValues;
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function getOrder
     * @async
     * @param {sellerModel/customerModel} user 
     * @param {Object} options -  should have orderId to be retrieved
     * @description retrieves requested order values or throws error
     * @returns {Object} order values
     */
    async getOrder (user, options) {
        if( options && options.orderId) {
            const order = await user.getOrders({ where: { id : options.orderId }});
            return {... order[0].dataValues};
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function updateOrder
     * @async
     * @param {sellerModel/customerModel} user 
     * @param {Object} options -  should have orderId with the values to be updated
     * @description updates the contact
     * @return {Object} order values
     */
    async updateOrder (user, options) {
        if ( options && options.orderId) {
            const order = await user.getOrders({ where: { id : options.orderId }});
            if(order[0]) {
                delete options.orderId;
                await order[0].update(options);
                return {...order[0].dataValues };
            } else throw new AppError(errorConstants.INVALID_INPUT, errorConstants.DATA_NOT_FOUND, true, 404);
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

}

module.exports = orderService;