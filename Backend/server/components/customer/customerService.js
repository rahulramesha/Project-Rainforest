const short = require('short-uuid');
const bcrypt = require('bcrypt');

const db = require('../../database/sequelize/database/models');
const localUtil = require('../util');
const AppError = require('../error/appError');
const errorConstants = require('../../constants/errorConstants');

const customerModel = db.customer;
const saltRounds = 10;

class CustomerService {

    /**
     * @function hideSensitiveInfo
     * @param customer - customer record or values
     * @description hides customer sensitive data
     * @returns {Object} customer values
     */
    hideSensitiveInfo ( customer ) {
        if(customer) {
            if(customer.dataValues) {
                customer = { ...customer.dataValues };
            }
            customer.password = null;
            customer.csrfSecret = null;
            return localUtil.clean(customer);
        }
    }

    /**
     * @function login
     * @async
     * @param {Object} formData - email/username and password
     * @description retrieves the customer
     * @returns {Object} customer values
     */
    async login( formData ) {
        if (formData && formData.email && formData.password) {
            let customer = await customerModel.findOne({ where: {email: formData.email}});
            if (!customer) throw new AppError(errorConstants.INVALID_INPUT, errorConstants.USER_NOT_FOUND, true, 404);
            const match = await bcrypt.compare(formData.password, customer.password);
            if (match) {
                return { ...customer.dataValues };
            } else {
                throw new AppError(errorConstants.VALIDATION_ERROR, errorConstants.PASSWORD_NO_MATCH, true, 401);
            }
        }
    }

    /**
     * @function createCustomer
     * @async
     * @param {Object} formData - should contain all the required fields to create a customer record
     * @description creates the customer record
     * @returns {Object} customer values
     */
    async createCustomer( formData ) {
        let values = {};
        if (formData && formData.email) {
            values.firstName = formData.firstName;
            values.lastName = formData.lastName;
            values.email = formData.email.toLowerCase();
            values.password = await bcrypt.hash(formData.password, saltRounds);
            values.csrfSecret = short.generate();
            values.primaryPhoneNumber = formData.primaryPhoneNumber;
            values.countryCode = formData.countryCode;
            const customer = await customerModel.create(values);
            return { ...customer.dataValues };
        } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function getProfile
     * @async
     * @param {UUID} userId - id of the customer
     * @description gets the customer values and hides sensitive info
     * @returns {Object} customer values
     */
    async getProfile( userId ) {
        let customer = await getCustomer(userId);
        return hideSensitiveInfo(customer);
    }

    /**
     * @function getCustomer
     * @async
     * @param {UUID} userId - id of the customer
     * @description creates the customer record
     * @returns {customerModel} customer Record
     */
    async getCustomer( userId ) {
        const customer = await customerModel.findByPk(userId);
        return customer;
    }

    /**
     * @function updatecsrfSecret
     * @async
     * @param {customerModel} customer - customer record
     * @description updates the csrfToken secret of customer
     * @returns {customerModel} updated customer record
     */
    async updatecsrfSecret (customer) {
        let values = {};
        values.csrfSecret = short.generate();
        customer = await this.updateCustomer(customer, values);
        return customer;
    }

    /**
     * @function updateCustomer
     * @async
     * @param {customerModel} customer - customer record
     * @param {Object} values - fields of the customer to update
     * @description updates the csrfToken secret of customer
     * @returns {customerModel} updated customer record
     */
    async updateCustomer (customer, values) {
        if(values.email) {
            throw new AppError(errorConstants.INVALID_INPUT, errorConstants.EMAIL_CANNOT_UPDATE, true, 401, errorConstants.EMAIL);
        }
        await customer.update(values);
        return { ...customer.dataValues };
    }

    /**
     * @function deleteCustomer
     * @async
     * @param {customerModel} customer - customer record
     * @description deletes customer record
     * @returns {boolean} returns a boolean
     */
    async deleteCustomer( customer ) {
        const customer = await customerModel.destroy({
            where: { id: customer.id }
        });
        return true;
    }

}

module.exports = CustomerService;