const short = require('short-uuid');
const bcrypt = require('bcrypt');

const sellerModel = require('../../database/sequelize/database/models').seller;
const localUtil = require('../util');
const AppError = require('../error/appError');
const errorConstants = require('../../constants/errorConstants');

const saltRounds = 10;

class SellerService {
    
    /**
     * @function hideSensitiveInfo
     * @param seller - seller record or values
     * @description hides seller sensitive data
     * @returns {Object} seller values
     */
    hideSensitiveInfo ( seller ) {
        if(seller) {
            if(seller.dataValues) {
                seller = { ...seller.dataValues };
            }
            delete seller.password
            delete seller.csrfSecret
            return localUtil.clean(seller);
        }
    }

    /**
     * @function sellerLogin
     * @async
     * @param {Object} formData - email/username and password
     * @description retrieves the seller
     * @returns {Object} seller values
     */
    async sellerLogin( formData ) {
        let values = {};
        if (formData && formData.email && formData.password) {
            let seller = await sellerModel.findOne({ where: {email: formData.email}});
            if (!seller) throw new AppError(errorConstants.INVALID_INPUT, errorConstants.USER_NOT_FOUND, true, 404);
            const match = await bcrypt.compare(formData.password, seller.password);
            if (match) {
                return { ...seller.dataValues };
            }
            else {
                throw new AppError(errorConstants.VALIDATION_ERROR, errorConstants.PASSWORD_NO_MATCH, true, 401);
            }
        }
    }

    /**
     * @function createSeller
     * @async
     * @param {Object} formData - should contain all the required fields to create a seller record
     * @description creates the seller record
     * @returns {Object} seller values
     */
    async createSeller( formData ) {
        let values = {};
        if (formData && formData.email) {
                values.name = formData.name;
                values.email = formData.email.toLowerCase();
                values.password = await bcrypt.hash(formData.password, saltRounds);
                values.csrfSecret = short.generate();
                values.primaryPhoneNumber = formData.primaryPhoneNumber;
                values.countryCode = formData.countryCode;
                const seller = await sellerModel.create(values);
                return { ...seller.dataValues };
            } else throw new AppError(errorConstants.REQUIRED_DATA_MISSING, errorConstants.REQUIRED_DATA_MISSING, false, 400);
    }

    /**
     * @function getSellerProfile
     * @async
     * @param {UUID} userId - id of the seller
     * @description gets the seller values and hides sensitive info
     * @returns {Object} seller values
     */
    async getSellerProfile( userId ) {
        let seller = await getSeller(userId);
        return hideSensitiveInfo(seller);
    }

    /**
     * @function getSeller
     * @async
     * @param {UUID} userId - id of the seller
     * @description creates the seller record
     * @returns {sellerModel} seller Record
     */
    async getSeller( userId ) {
        const seller = await sellerModel.findByPk(userId);
        return seller;
    }

    /**
     * @function updatecsrfSecret
     * @async
     * @param {sellerModel} seller - seller record
     * @description updates the csrfToken secret of seller
     * @returns {sellerModel} updated seller record
     */
    async updatecsrfSecret (seller) {
        let values = {};
        values.csrfSecret = short.generate();
        seller = await this.updateSeller(seller, values);
        return seller;
    }

    /**
     * @function updateSeller
     * @async
     * @param {sellerModel} seller - seller record
     * @param {Object} values - fields of the seller to update
     * @description updates the csrfToken secret of seller
     * @returns {sellerModel} updated seller record
     */
    async updateSeller (seller, values) {
        if(values.email) {
            throw new AppError(errorConstants.INVALID_INPUT, errorConstants.EMAIL_CANNOT_UPDATE, true, 401, errorConstants.EMAIL);
        }
        await seller.update(values);
        return { ...seller.dataValues };
    }

    /**
     * @function deleteSeller
     * @async
     * @param {sellerModel} seller - seller record
     * @description deletes seller record
     * @returns {boolean} returns a boolean
     */
    async deleteSeller( currentSeller ) {
        const seller = await sellerModel.destroy({
            where: { id: currentSeller.id }
        });
        return this.hideSensitiveInfo(seller);
    }

}

module.exports = SellerService;