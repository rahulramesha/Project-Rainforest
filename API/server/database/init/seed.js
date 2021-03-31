const db = require('../sequelize/database/models')

const sequelize = db.sequelize

const executeSequelizeCommand = require('./util')

let retryCount = 0
const retryLimit = 10

const migrateandSeedData = async () => {
    try{
        executeSequelizeCommand('sequelize db:migrate')
        console.log('migrate command executed')
        const { count } = await db.item.findAndCountAll({
            limit: 1
        });
        if(count < 1) {
            executeSequelizeCommand('sequelize db:seed:all')
            console.log('seed command executed')
        }

    } catch(err) {
        console.error('Error in Migrate and Seed Postgres: ', err)
    }

}

const retryInterval = setInterval( async () => {
    retryCount++

    try {
        await sequelize.authenticate()
        console.log('Postgres: connection Established')
        migrateandSeedData()
        clearInterval(retryInterval)
    } catch {
        console.error('Postgres: Connection Error')
    }

    if(retryCount === retryLimit) {
        clearInterval(retryInterval)
    }

}, 15000)

