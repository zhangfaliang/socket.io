const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const contentBase = "./server/asset/public";
const path = require("path");
console.log('NODE_ENV: ', env.NODE_ENV) // 'local'
console.log('Production: ', env.production) // true
module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: contentBase,
    hot: true,
    host: "localhost",
    port: "6666"
  },
  mode: "development",
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(contentBase),
    library: "socket",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist"
  }
});
