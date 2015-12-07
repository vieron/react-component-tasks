var utils = require('../utils/index');
var path = require('path');
var merge = require('lodash.merge');

var ROOT_PATH = process.cwd();
var pkg = JSON.parse(require('fs').readFileSync(path.join(ROOT_PATH, 'package.json')));


var defaults = {
    es6: true,
    filename: utils.npm.getUnscopedName(pkg.name),
    library: utils.npm.getCapitalizedName(pkg.name),
    path: {
        dist: path.join(ROOT_PATH, 'dist'),
        es5: path.join(ROOT_PATH, 'es5'),
        src: path.join(ROOT_PATH, 'src'),
        demo: path.join(ROOT_PATH, 'demo'),
        ghpages: path.join(ROOT_PATH, 'gh-pages'),
        tests: path.join(ROOT_PATH, 'tests'),
        karmaConfig: path.join(ROOT_PATH, 'karma.config.js'),
        webpackConfig: path.join(ROOT_PATH, 'webpack.config.js'),
        eslintConfig: utils.eslint.getConfigPath()
    }
};


var mergeConfig = function(options) {
    return merge(defaults, options);
}

module.exports.config = defaults;
module.exports.merge = mergeConfig;