var tasks = [
    require('./tasks/webpack-dev'),
    require('./tasks/webpack-dist'),
    require('./tasks/webpack-demosite'),
    require('./tasks/github-deploy'),
    require('./tasks/eslint'),
    require('./tasks/babel-es5'),
    require('./tasks/karma-test'),
    require('./tasks/karma-tdd')
];

module.exports.webpack = require('./webpack');
module.exports.karma = require('./karma');
module.exports.tasks = [];
tasks.forEach(function(task) {
    module.exports.tasks[task._name] = task;
});