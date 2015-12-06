var tasks = [
    require('./tasks/webpack-dev'),
    require('./tasks/webpack-dist'),
    require('./tasks/webpack-demosite'),
    require('./tasks/github-deploy'),
    require('./tasks/eslint'),
    require('./tasks/babel-es5')
];

module.exports.webpack = require('./webpack');
module.exports.tasks = [];
tasks.forEach(function(task) {
    module.exports.tasks[task._name] = task;
});