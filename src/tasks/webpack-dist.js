var spawn = require('child_process').spawn;
var path = require('path');

function webpackDist(params) {
    var command = path.join(__dirname, '../../node_modules/webpack/bin/webpack.js');
    var args = params._spawn;
    console.log('$ %s %s', path.basename(command), args.join(' '));

    process.env.WEBPACK_CONFIG_ENV = 'dist';
    spawn(command, args, {stdio: 'inherit'});
}

webpackDist._description = 'dist task desciption';
webpackDist._defaults = function(config) {
    return {
        'config': config.path.webpackConfig
    };
};

module.exports = webpackDist;