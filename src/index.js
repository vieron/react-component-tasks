var requireDir = require('require-dir');

module.exports.webpack = require('./webpack');
module.exports.karma = require('./karma');
module.exports.tasks = requireDir('./tasks');