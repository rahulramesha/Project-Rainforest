const exec = require('child_process').execSync;

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

module.exports = executeSequelizeCommand