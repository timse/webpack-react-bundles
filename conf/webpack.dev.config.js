const webpack = require('webpack');
const wc = require('webpack-config');

module.exports = new wc.Config().extend('conf/webpack.base.config.js').merge({});