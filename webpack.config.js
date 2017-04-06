const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = require('lodash');

module.exports = {
    entry: {
        app: ['./app/index.js']
    },
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.map',
        path: path.resolve(__dirname, './dist')
    },
    devServer: {
        hot: true,
        port: 3001,
        contentBase: path.resolve(__dirname, './dist'),
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['es2015', { 'modules': false }], 'react'],
                            plugins: ['transform-async-to-generator',
                                'transform-decorators-legacy',
                                'transform-runtime',
                                'react-html-attrs',
                                'react-hot-loader/babel'],
                        }
                    }
                ]
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|gif|jpg|png)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: "body"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lodash+moment',
            minChunks: function (module) {
                let result = module.context && _.reduce(['lodash', 'moment'], (result, record) => result || _(module.context).includes(`node_modules/${record}`), false);
                return result;
            }
        }),
        // put everything else in the other file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                let result = module.context && _(module.context).includes(`node_modules`) && !_.reduce(['lodash', 'moment'], (result, record) => result || _(module.context).includes(`node_modules/${record}`), false);
                return result;
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map'
}