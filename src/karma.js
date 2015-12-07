var path = require('path');

var webpack = require('./webpack');
var defaults = require('./config/defaults');

function karmaConfig(config, options) {
    options = defaults.merge(options);

    var webpackConf = webpack.getConfig({env: 'test'});
    var basePath = process.cwd();
    var entryPoint = path.join(options.path.tests, 'index.js');

    var kConfig = {
        basePath: basePath,
        frameworks: ['mocha', 'chai'],
        client: {
            mocha: {
                reporter: 'html', // change Karma's debug.html to the mocha web reporter
                ui: 'bdd'
            }
        },
        files: [
            path.join(__dirname, '../node_modules/phantomjs-polyfill/bind-polyfill.js'),
            entryPoint
        ],
        preprocessors: {},
        colors: true,
        reporters: ['mocha'],
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        webpack: webpackConf,
        webpackMiddleware: {
            noInfo: true,
            stats: {
                colors: true
            }
        },
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },
        plugins: [
            require('karma-sourcemap-loader'),
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-mocha-reporter'),
            require('karma-chai'),
            require('karma-phantomjs-launcher')
        ]
    };

    kConfig.preprocessors[entryPoint] = ['webpack', 'sourcemap'];

    return kConfig;
};


module.exports = {
    getConfig: function(config, options) {
        return karmaConfig(config, options);
    }
}