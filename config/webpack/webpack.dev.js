const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

// DashboardPlugin = "";

var config = {
    devtool: 'source-map',
    context: path.resolve('./src'),
    entry: {
        index: ['./app/index.ts'],
        common: ['./app/common/vendor.ts', './app/common/imports.ts']
    },
    output: {
        path: path.resolve('./dist'),
        filename: 'assets/js/[name].bundle.js',
        sourceMapFilename: 'assets/js/[name].map',
        devtoolModuleFilenameTemplate: function (info) {
            return "file:///" + info.absoluteResourcePath;
        },
        libraryTarget: 'var',
        library: '[name]EntryPoint'
    },
    module: {
        loaders: [
            { test: /\.ts$/, exclude: ["node_modules"], loader: 'ts-loader' },
            { test: /\.html$/, loaders: "html" },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            {
                test: /\.scss$/, loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: ['css-loader','postcss-loader','sass-loader'],
                })
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            }            
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [path.resolve('./src'), 'node_modules']
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets' }
        ], {
            ignore: [
                '*.scss'
            ],
            copyUnmodified: true
        }
        ),
        new webpack.LoaderOptionsPlugin({
            minimize:true,
            options: {
                resolve: {
                    extensions: ['.ts', '.tsx', '.js']
                },
                postcss: [
                    require('autoprefixer')
                ]
            }
        }),
        new ExtractTextPlugin('assets/styles/[name].css'),
        new HtmlWebpackPlugin({
            title: 'Shift Active Media - Task',
            template: '!!ejs-loader!src/index.html'
        }),        
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity,
            filename: 'assets/js/common.bundle.js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: { comments: false },
            sourceMap: true
        }),
        new DashboardPlugin(dashboard.setData)
    ]
};

module.exports = config;