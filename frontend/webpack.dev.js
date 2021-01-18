const fs = require('fs');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const path = require("path");
const DefinePlugin = require("webpack").DefinePlugin;

console.log(__dirname);

module.exports = (env, argv) => {
  return merge(common, {
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      host: '0.0.0.0',
      disableHostCheck: true,
      https: true,
      key: fs.readFileSync(__dirname + '/dev_cert_keys/server.key'),
      cert: fs.readFileSync(__dirname + '/dev_cert_keys/server.crt')
    },
    output: {
      publicPath: "/"
    },
    plugins: [
      new DefinePlugin({
        PRODUCTION: false,
        DEMO: false
      })
    ]
  })
};