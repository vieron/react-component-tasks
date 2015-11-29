var ghpages = require('gh-pages');
var spawn = require('child_process').spawn;
var path = require('path');

function ghPages(cmd, opts, args) {
    spawn(
        path.join(__dirname, '../../node_modules/gh-pages/bin/gh-pages'),
        args,
        {stdio: 'inherit'});
}

ghPages._name = 'github-deploy';
ghPages._description = 'deploy to Github Pages';
ghPages._options = [
    ['-d, --dist <dist>', 'base directory for all source files', './gh-pages'],
    ['-s, --src <src>', 'pattern used to select which files should be published']
];

module.exports = ghPages;