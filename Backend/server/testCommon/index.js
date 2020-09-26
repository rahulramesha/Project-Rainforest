require('dotenv').config({ path: process.cwd() + '/test.env' });

const seeder = require('./databaseSeeder');
const testServer = require('./testServer');
const ids = require(process.cwd() + '/server/database/sequelize/customIds');

module.exports.seeder = seeder;
module.exports.server = testServer.server;
module.exports.parseCookies = testServer.parseCookie;
module.exports.ids = ids