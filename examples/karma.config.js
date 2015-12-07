'use strict';

module.exports = function(config) {
    var _conf = require('react-component-tasks').karma.getConfig(config);
    config.set(_conf);
};