const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const path = require("path");
const DefinePlugin = require("webpack").DefinePlugin;

module.exports = (env, argv) => {
  return merge(common, {
    mode: "production",
    output: {
      publicPath: "/viewer",
      path: path.join(__dirname, '..', 'viewer_build')
    },
    plugins: [
      new DefinePlugin({
        PRODUCTION: true,
        DEMO: true
      })
    ]
  });
};