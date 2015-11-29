var spawn = require('child_process').spawn;
var path = require('path');

function webpackDev() {
    process.env.WEBPACK_CONFIG_ENV = 'dev';

    spawn(
        path.join(__dirname, '../../node_modules/webpack-dev-server/bin/webpack-dev-server.js'),
        ['--config', './webpack.config.js'],
        {stdio: "inherit"});
}

webpackDev._name = 'webpack-dev';
webpackDev._description = 'dev task desciption';

module.exports = webpackDev;

