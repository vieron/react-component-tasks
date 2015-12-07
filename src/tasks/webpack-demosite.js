var spawn = require('child_process').spawn;
var path = require('path');

function webpackDemoSite(params) {
    var command = path.join(__dirname, '../../node_modules/webpack/bin/webpack.js');
    var args = params._spawn;
    console.log('$ %s %s', path.basename(command), args.join(' '));

    process.env.WEBPACK_CONFIG_ENV = 'demosite';
    spawn(command, args, {stdio: 'inherit'});
}

webpackDemoSite._description = 'demosite task desciption';
webpackDemoSite.defaults = function(config) {
    return {
        'config': config.path.webpackConfig
    };
}

module.exports = webpackDemoSite;