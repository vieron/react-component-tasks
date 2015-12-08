var path = require('path');
var spawn = require('child_process').spawn;

function reactDocgen(params) {
    var command = path.join(__dirname, '../../node_modules/react-docgen-readme/bin/cli.js');
    var args = params._spawn;
    console.log('$ %s %s', path.basename(command), args.join(' '));

    spawn(command, args, {stdio: 'inherit'});
}

reactDocgen._description = 'react-docgen';
reactDocgen._defaults = function(config) {
    return {
        '': config.path.src,
        'readmeFile': path.join(process.cwd(), '/README.md')
    };
};

module.exports = reactDocgen;