const redis = require('redis');
const { promisify } = require('util');

const { seller, customer } = require('../../database/sequelize/database/models');

const client = redis.createClient();
client.getAsync = promisify(client.get).bind(client);
client.setAsync = promisify(client.set).bind(client);

client.on("error", function (err) {
    console.log(" Error " + err);
});


module.exports = {
    /**
     * @function authCache
     * @async
     * @param {Request} req 
     * @param {Response} res
     * @param {function} next
     * @description middlewware function that adds the currentUser to request from the cache
     */
    authCache: async (req, res, next) => {
        let userObject;
        try {
            const session_id = req.cookies['session-id'];
            const csrf_token = req.cookies['XSRF-TOKEN'];
            const xsrf_token = req.headers['xsrf-token'];
            if(session_id && xsrf_token  && xsrf_token == csrf_token) {
                userObject = await client.getAsync(`${session_id};${xsrf_token}`);
                userObject = JSON.parse(userObject);
                if(userObject && userObject.currentUser) {
                    req.isSeller = userObject.isSeller;
                    if(req.isSeller) req.currentUser = seller.build(userObject.currentUser);
                    else req.currentUser = customer.build(userObject.currentUser);
                    req.currentUser.isNewRecord = false;
                    client.expire(`${session_id};${xsrf_token}`, 60);
                }
            }
        } catch(err) {
            throw err;
        } finally {
            next();
        }
    },
    client
}