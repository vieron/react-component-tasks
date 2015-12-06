var ghpages = require('gh-pages');
var spawn = require('child_process').spawn;
var path = require('path');

var defaults = require('../config/defaults');

function ghPages(params) {
    var command = path.join(__dirname, '../../node_modules/gh-pages/bin/gh-pages');
    var args = params._spawn;
    console.log('$ %s %s', path.basename(command), args.join(' '));

    spawn(command, args, {stdio: 'inherit'});
}

ghPages._name = 'github-deploy';
ghPages._description = 'deploy to Github Pages';
ghPages._defaults = function(config) {
    return {
        'dist': config.path.ghpages,
        'src': config.path.src
    }
};

module.exports = ghPages;