const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const path = require("path");
const contentBase = "./server/static/public";

module.exports = merge(common, {
  devtool: "source-map",
  mode: "production",
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(contentBase),
    library: "socket",
    libraryTarget: "umd"
  },
  
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ]
});
