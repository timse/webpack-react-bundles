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
            chunks: ['lodash+moment']
        }),
        // put everything else in the other file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && _(module.context).includes(`node_modules`);
            }
        })
    ]
});