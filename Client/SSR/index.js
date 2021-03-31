
const express = require('express')
const path = require('path');
const webpack = require('webpack')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const expressStaticGzip = require('express-static-gzip')

// const http2express = require('http2-express-bridge')
// const autopush = require('http2-express-autopush')
// const http2 = require('http2')
// const app = http2express(express)

const app = express()

const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== "production";
let isBuilt = false;

const done = () => {
    if (isBuilt) return;
    app.listen(PORT, () => {
        isBuilt = true;
        console.log(
            `Client server is up in ${process.env.NODE_ENV} mode`
        );
    });

    // let options = {
    //     key: process.env.TLS_KEY,
    //     cert: process.env.TLS_CERT,
    //     ca: process.env.TLS_CERT,
    //     allowHTTP1: true
    // };

    // let server = http2.createSecureServer(options, app);
    // server.listen(PORT, () => {
    //     isBuilt = true;
    //     console.log(
    //         `Server listening on https://localhost:${PORT} in ${process.env.NODE_ENV}`
    //     );
    // })
};

if (isDev) {
    const configDevClient = require('../config/webpack.client_dev');
    const configDevServer = require('../config/webpack.server_dev');

    const compiler = webpack([configDevClient, configDevServer])

    const clientCompiler = compiler.compilers[0];

    const webpackDevMiddleware = require('webpack-dev-middleware')(
        compiler,
        configDevClient.devServer
    );

    const webpackHotMiddleware = require('webpack-hot-middleware')(
        clientCompiler,
        configDevClient.devServer
    );
    
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddleware);
    app.use(webpackHotServerMiddleware(compiler));
    console.log("Webpack hot server Middleware enabled");
    done();
} else {
    const configProdClient = require('../config/webpack.client_prod');
    const configProdServer = require('../config/webpack.server_prod');

    webpack([configProdClient, configProdServer]).run((err, stats) => {
        const clientStats = stats.toJson().children[0];
        const render = require('../build/prod-server-bundle.js').default
        console.log(
            stats.toString({
                colors: true
            })
        )
        app.use('/',
            expressStaticGzip(path.join(__dirname, '../public'), {
                enableBrotli: true
            })
        );
        app.use(render({ clientStats }))
        done()

    })
}
