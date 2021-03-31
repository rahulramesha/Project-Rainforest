const sequelize = require('../sequelize/database/models').sequelize
const executeSequelizeCommand = requier('./util')

let retryCount = 0
const retryLimit = 10

const migrateData = () => {
    try{
        executeSequelizeCommand('sequelize db:migrate')
        console.log('migrate command executed')
    } catch(err) {
        console.error('Error while Migrating Postgres: ', err)
    }
    
}

const retryInterval = setInterval(async () => {
    retryCount++

    try {
        await sequelize.authenticate()
        console.log('Postgres: connection Established')
        migrateData()
        clearInterval(retryInterval)
    } catch {
        console.error('Postgres: Connection Error')
    }

    if(retryCount === retryLimit) {
        clearInterval(retryInterval)
    }

}, 15000)

