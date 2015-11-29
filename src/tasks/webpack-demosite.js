var spawn = require('child_process').spawn;
var path = require('path');

function webpackDemoSite() {
    process.env.WEBPACK_CONFIG_ENV = 'demosite';

    spawn(
        path.join(__dirname, '../../node_modules/webpack/bin/webpack.js'),
        ['--config', './webpack.config.js'],
        {stdio: "inherit"});
}

webpackDemoSite._name = 'webpack-demosite';
webpackDemoSite._description = 'demosite task desciption';

module.exports = webpackDemoSite;