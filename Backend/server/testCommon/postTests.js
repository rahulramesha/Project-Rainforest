require('dotenv').config({ path: process.cwd() + '/test.env' });

const db = require('../database/sequelize/database/models');

afterAll(() => {
    db.sequelize.close();
});

jest.setTimeout(10000);