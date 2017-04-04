const path = require('path');
const webpack = require('webpack');
const wc = require('webpack-config');

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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context &&
                    module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: true
            }
        })]
});