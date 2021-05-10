const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../../config/webpack.config.local');

const compiler = webpack(webpackConfig);

const devMiddleware =  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true
    }
})

module.exports = function setup(app) {
    return new Promise((resolve, reject) => {
        app.use(devMiddleware);

        app.use(webpackHotMiddleware(compiler));

        app.use('/health', (req, res) => res.json({ description: "Basic React Application with ES2015, Express.js, and Webpack 4", status: "UP" }));

        // all other requests be handled by UI itself
        app.get('*', (req, res, next) => {
            if (req.url.includes('/api')) return next();
            /** This is to make sure the client router will still handle routing on page refresh */
            res.sendFile(path.resolve(__dirname, '..', '..', '..', 'build-dev', 'client', 'index.html'));
        });

        devMiddleware.waitUntilValid(() => {
            console.log("Webpack Dev Middleware is valid");
            resolve();
        })
    })
};