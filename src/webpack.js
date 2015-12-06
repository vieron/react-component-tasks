var utils = require('./utils/index');
var path = require('path');
var qs = require('qs');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var merge = require('lodash.merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Clean = require('clean-webpack-plugin');

var defaults = require('./config/defaults');
var pkg = JSON.parse(require('fs').readFileSync(
    path.join(process.cwd(), 'package.json')));

var baseConfig = function(options) {
    options = defaults.merge(options);

    return {
        module: {
            preLoaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules|bower_components/
                }
            ],

            loaders: [
                {
                    test: options.es6 ? /\.jsx?$/ : /\.jsx$/,
                    loader: 'babel-loader',
                    exclude: /node_modules|bower_components/,
                    query: pkg.babel
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('style-loader', [
                              'css-loader?sourceMap',
                              'sass-loader',
                              'postcss-loader'
                            ].join('!'))
                },
                {
                    test: /\.icss$/,
                    loader: ExtractTextPlugin.extract('style-loader', [
                        'css-loader?' + qs.stringify({
                            modules: 1,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }),
                        'postcss-loader'
                    ].join('!'))
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', [
                        'css-loader?' + qs.stringify({ sourceMap: 1, importLoaders: 1 }),
                        'postcss-loader'
                    ].join('!'))
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                        // inline base64 URLs for <=8k images. If the file is greater than
                        // the limit the file-loader is used and all query parameters are passed to it.
                        // To disable replace 'url-loader?' by 'file-loader?'
                        'url-loader?' + qs.stringify({
                          limit: 8192,
                          hash: 'sha512',
                          digest: 'hex',
                          name: 'img/[name].[hash].[ext]'
                        }),
                        'image-webpack?' + JSON.stringify({
                          bypassOnDebug: true,
                          progressive: true,
                          optimizationLevel: 8,
                          interlaced: false,
                          pngquant: { quality: '65-90', speed: 4 }
                        })
                    ]
                }
            ]
        },

        externals: [],

        resolve: {
            extensions: ['', '.js', '.jsx', '.json', '.scss', '.css', '.icss'],
            modulesDirectories: ['src', 'node_modules'],
            fallback: [
                // required for babel-runtime requires
                path.join(__dirname, '../node_modules')
            ]
        },

        resolveLoader: {
            fallback: [path.join(__dirname, '../node_modules')],
        },

        plugins: [],

        postcss: [autoprefixer],

        eslint: {
            failOnWarning: false,
            failOnError: true,
            configFile: utils.eslint.getConfigPath()
        },

        stats: {
            colors: true,
            reasons: true,
            hash: false,
            modulesSort: 'name'
        }
    };
}

var devConfig = function(options) {
    options = defaults.merge(options);

    return webpackMerge(baseConfig(options), {
        devtool: 'eval-source-map',
        entry: options.path.demo,
        plugins: [
            new ExtractTextPlugin('[name].css', {disable: false}),
            new HtmlWebpackPlugin({
                title: utils.npm.getTitle(pkg)
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            host: process.env.HOST,
            port: process.env.PORT,
            stats: 'errors-only'
        }
    });
};

var distConfig = function(options) {
    options = defaults.merge(options);

    return webpackMerge(baseConfig(options), {
        devtool: 'source-map',
        entry: options.path.src,
        output: {
            path: options.path.dist,
            filename: options.filename + '.js',
            libraryTarget: 'umd',
            library: options.library
        },
        externals: {
            'react': {
                commonjs: 'react',
                commonjs2: 'react',
                amd: 'React',
                root: 'React'
            }
        },
        plugins: [
            new ExtractTextPlugin('[name].css', {disable: false}),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}

var demositeConfig = function(options) {
    options = defaults.merge(options);

    return webpackMerge(baseConfig(options), {
        devtool: 'eval-source-map',
        entry: {
            app: options.path.demo,
            vendors: [
                'react'
            ]
        },
        output: {
            path: options.path.ghpages,
            filename: '[name].[chunkhash].js',
            chunkFilename: '[chunkhash].js'
        },
        plugins: [
            new Clean([options.path.ghpages]),
            new ExtractTextPlugin('[name].[chunkhash].css'),
            new HtmlWebpackPlugin({
                title: utils.npm.getTitle(pkg)
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendors']
            })
        ],
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            host: process.env.HOST,
            port: process.env.PORT,
            stats: 'errors-only'
        }
    });
}


var registry = {
    base: baseConfig,
    dev: devConfig,
    dist: distConfig,
    demosite: demositeConfig
};


module.exports = {
    getConfig: function(options) {
        options || (options = {});
        var env = options.env || process.env.WEBPACK_CONFIG_ENV;

        if (!registry[env]) {
            throw new Error('No webpack config found for webpack environment: ' + env);
        }

        return registry[env](options);
    }
}