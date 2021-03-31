const jwt = require('jsonwebtoken');
const util = require('util');

const customerService = require('../customer/customerService');
const sellerService = require('../seller/sellerService');
const { client } = require('./redisCache');

const customerServiceInstance = new customerService();
const sellerServiceInstance = new sellerService();

const jwtVerify = util.promisify(jwt.verify);

/**
 * @function clearCookies
 * @param {Response} res
 * @description clears authentication cookies 
 */
const clearCookies = res => {
    res.clearCookie('session-id');
    res.clearCookie('XSRF-TOKEN');
}

module.exports = {
    clearCookies,
    /**
     * @function setCookies
     * @param {databaseModel} user 
     * @param {Response} res
     * @param {boolean} isSeller - indicates if the user is a seller
     * @description creates jwt tokens sets tokens cookies to response
     */
    setCookies: (user, res, isSeller = false) => {
        clearCookies(res);
        const sessionId = jwt.sign({ id: user.id, isSeller }, process.env.SECRET_KEY, { expiresIn: '60d'});
        const csrfToken = jwt.sign({ csrfToken: 'auth' }, user.csrfSecret, { expiresIn: '10d'});
        res.cookie('session-id', sessionId, { maxAge: 1000 * 60 * 60 * 24 * 60 , httpOnly: true });
        res.cookie('XSRF-TOKEN', csrfToken, { maxAge: 1000 *60 * 60 * 24 * 10 , httpOnly: false });
        const value = JSON.stringify({
            currentUser: user, 
            isSeller
        });
        client.set(`${sessionId};${csrfToken}`, value,'EX', 60);
    },
    /**
     * @function auth
     * @async
     * @param {Request} req 
     * @param {Response} res
     * @param {function} next
     * @description middlewware function that adds the currentUser to request from the database after validation of tokens
     */
    auth: async (req, res, next) => {
        if(req.currentUser) {
            next();
        } else {
            let user;
            try {
                const session_id = req.cookies['session-id'];
                const csrf_token = req.cookies['XSRF-TOKEN'];
                const xsrf_token = req.headers['xsrf-token'];
                if (session_id && xsrf_token  && xsrf_token==csrf_token ) {
                    const sessionObj = await jwtVerify(session_id, process.env.SECRET_KEY);
                    if( sessionObj && sessionObj.id ) {
                        if(sessionObj.isSeller) user = await sellerServiceInstance.getSeller(sessionObj.id);
                        else user = await customerServiceInstance.getCustomer(sessionObj.id);
                        if (user) {
                            const csrfverify =  await jwtVerify(xsrf_token, user.csrfSecret);
                            if (csrfverify &&  csrfverify.csrfToken === 'auth') {
                                req.currentUser = user;
                                req.isSeller = sessionObj.isSeller;
                                const value = JSON.stringify({
                                    currentUser: user, 
                                    isSeller: sessionObj.isSeller
                                });
                                client.set(`${session_id};${xsrf_token}`, value,'EX', 60);
                            }
                        }
                    }
                }
            } catch (err) {
                throw err;
            } finally {
                next();
            }
        }
        
    }

}