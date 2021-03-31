const exec = require('child_process').execSync;

module.exports.freshSeed = (isLog) => executeSequelizeCommand('sequelize db:migrate:undo:all && sequelize db:migrate && sequelize db:seed:all', isLog);

module.exports.seed = (isLog) => executeSequelizeCommand('sequelize db:seed:all', isLog);

module.exports.unSeed = (isLog) => executeSequelizeCommand('sequelize db:seed:undo:all', isLog);

module.exports.removeSeed = (isLog) => executeSequelizeCommand('sequelize db:migrate:undo:all', isLog);

module.exports.freshSetup = (isLog) => executeSequelizeCommand('sequelize db:migrate:undo:all && sequelize db:migrate', isLog);

//module.exports.freshSetup = () => executeSequelizeCommand('Sequelize db:seed:undo:all && sequelize db:seed:all');

function executeSequelizeCommand(str, isLog = false) {
    const migrate = exec(
        str,
        {
            env: process.env,
            cwd: process.cwd() + '/server/database/sequelize'
        },
        err => {
            console.log('('+str+') : FAILED\n');
            console.log(err);
        }
    );
    
    
    if(isLog){
        migrate.stdout.pipe(process.stdout);
        migrate.stderr.pipe(process.stderr);
        console.log('('+str+') : DONE');
    }

}
