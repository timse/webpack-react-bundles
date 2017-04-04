const webpack = require('webpack');
const wc = require('webpack-config');

wc.environment.setAll({
    env: () => process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'
});

// Also you may use `'conf/webpack.[NODE_ENV].config.js'`
module.exports = new wc.Config().extend('conf/webpack.[env].config.js');