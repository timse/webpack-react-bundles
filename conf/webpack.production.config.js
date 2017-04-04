const path = require('path');
const webpack = require('webpack');
const wc = require('webpack-config');
const _ = require('lodash');

module.exports = new wc.Config().extend('conf/webpack.base.config.js').merge({
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.map',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: true
            }
        }),
        // put lodash and moment in one file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lodash+moment',
            minChunks: function (module) {
                let result = module.context && _.reduce(['lodash', 'moment'], (result, record) => result || _(module.context).includes(`node_modules/${record}`), false);
                if (result) {
                    console.log('+++', module.context);
                }
                return result;
            }
        }),
        // put everything else in the other file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                let result = module.context && _(module.context).includes(`node_modules`) && !_.reduce(['lodash', 'moment'], (result, record) => result || _(module.context).includes(`node_modules/${record}`), false);
                console.log('attempt', module.context);
                if (result) {
                    console.log('---', module.context);
                }
                return result;
            }
        })
    ]
});