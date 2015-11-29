#!/usr/bin/env node

var program = require('commander');
var tasks = require('./index.js').tasks;

program.version('0.0.0');

// load all the tasks registered in `index.js` as cli commands
Object.keys(tasks).forEach(function(taskKey) {
    var task = tasks[taskKey];
    var c = program.command(task._name, task.description);

    if (task._options) {
        task._options.forEach(function(task_args) {
            c = c.option.apply(c, task_args);
        });
    }

    // c.action(task);
    c.action(function(cmd) {
        var opts = cmd.opts();
        var args = [];
        Object.keys(opts).forEach(function(param) {
            var val = opts[param];
            val && args.push(('--' + param), val);
        });

        task(cmd, opts, args);
    });
});


program.parse(process.argv);
