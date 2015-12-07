var spawn = require('child_process').spawn;
var path = require('path');

function webpackDev(params) {
    var command = path.join(__dirname, '../../node_modules/webpack-dev-server/bin/webpack-dev-server.js');
    var args = params._spawn;
    console.log('$ %s %s', path.basename(command), args.join(' '));

    process.env.WEBPACK_CONFIG_ENV = 'dev';
    spawn(command, args, {stdio: 'inherit'});
}

webpackDev._description = 'dev task desciption';
webpackDev._defaults = function(config) {
    return {
        'config': config.path.webpackConfig
    };
};


module.exports = webpackDev;

