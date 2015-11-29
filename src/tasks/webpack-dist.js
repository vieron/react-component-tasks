var spawn = require('child_process').spawn;
var path = require('path');

function webpackDist() {
    process.env.WEBPACK_CONFIG_ENV = 'dist';

    spawn(
        path.join(__dirname, '../../node_modules/webpack/bin/webpack.js'),
        ['--config', './webpack.config.js'],
        {stdio: "inherit"});
}

webpackDist._name = 'webpack-dist';
webpackDist._description = 'dist task desciption';

module.exports = webpackDist;