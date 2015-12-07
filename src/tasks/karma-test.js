var path = require('path');
var spawn = require('child_process').spawn;

function karmaTest(params) {
    var command = path.join(__dirname, '../../node_modules/karma/bin/karma');
    var args = ['start'].concat(params._spawn);
    console.log('$ %s %s', path.basename(command), args.join(' '));

    spawn(command, args, {stdio: 'inherit'});
}

karmaTest._description = 'sing-run tests with karma';
karmaTest._defaults = function(config) {
    return {
        'single-run': true,
        '': config.path.karmaConfig
    };
};

module.exports = karmaTest;