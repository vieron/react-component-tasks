var utils = require('../utils/index');
var path = require('path');
var spawn = require('child_process').spawn;

function eslint(params) {
    var command = path.join(__dirname, '../../node_modules/eslint/bin/eslint.js');
    var args = params._spawn;
    console.log('$ %s %s', path.basename(command), args.join(' '));

    spawn(command, args, {stdio: 'inherit'});
}

eslint._description = 'lint JavaScript code';
eslint._defaults = function(config) {
    return {
        'config': config.path.eslintConfig,
        'ext': ['.js', '.jsx'],
        '': path.join(config.path.src, '**')
    }
};

module.exports = eslint;