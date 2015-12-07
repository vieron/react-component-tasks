var path = require('path');
var spawn = require('child_process').spawn;

function babelES5(params) {
    var command = path.join(__dirname, '../../node_modules/babel-cli/bin/babel.js');
    var args = params._spawn;
    console.log('$ %s %s', path.basename(command), args.join(' '));

    spawn('rm', ['-rf', params.d], {stdio: 'inherit'});
    spawn(command, args, {stdio: 'inherit'});
}

babelES5._description = 'transform code to es5';
babelES5._defaults = function(config) {
    return {
        '': config.path.src,
        'd': config.path.es5,
        'source-maps': true
    };
};

module.exports = babelES5;