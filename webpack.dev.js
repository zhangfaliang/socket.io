const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const contentBase = "./server/public";

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: contentBase,
    hot: true,
    host: "localhost",
    port: 6666
  },
  mode: "development",

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist"
  }
});
