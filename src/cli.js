#!/usr/bin/env node

var program = require('yargs');
var omit = require('lodash.omit');
var get = require('lodash.get');
var merge = require('lodash.merge');

var utils = require('./utils/index');
var tasks = require('./index').tasks;
var defaults = require('./config/defaults');


function performTask(args, subargs) {
    var taskName = args._[0];
    var task = tasks[taskName];
    if (!task) { throw Error('The task `' + taskName + '` does not exists.'); }


    var params = merge(task._defaults(args), omit(subargs, ['$0', '_']));
    if (subargs._.length) {
        params = merge(params, {
            '': subargs._.join(' ').trim()
        });
    }

    params._spawn = utils.objectToSpawnArgs(params);
    task(params, args, subargs);
}

var configOptions = ['es6', 'filename', 'library', 'path.dist', 'path.es5',
                     'path.src', 'path.demo', 'path.ghpages', 'path.tests',
                     'path.webpackConfig', 'path.eslintConfig'];
var options = {};
configOptions.forEach(function(optKey) {
    options[optKey] = {
        default: get(defaults.config, optKey)
    };
});

var argv = program
    .usage('Usage: $0 <task> [options] -- [taskoptions]')
    .demand(1);

Object.keys(tasks).forEach(function(taskKey) {
    var task = tasks[taskKey];
    argv = argv.command(task._name, task._description, function(yargs, args) {
        performTask(args, yargs.parse(args._.slice(1)));
    });
});

argv = argv.options(options).argv;