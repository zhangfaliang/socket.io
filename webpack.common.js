const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ASSET_PATH = "/static";
const webpack = require("webpack");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    app: "./web/src/index.js",
    vendor: ["lodash"]
  },
  externals: {
    lodash: {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "_"
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader"
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Progressive Web Application",
      template: path.join(__dirname, "/server/index.ejs"),
      inject: false
    }),
    new webpack.DefinePlugin({
      "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH)
    }),
    // new WorkboxPlugin.GenerateSW({
    //   swDest: "sw.js",
    // 这些选项帮助 ServiceWorkers 快速启用
    // 不允许遗留任何“旧的” ServiceWorkers
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   runtimeCaching: [
    //     {
    //       urlPattern: new RegExp("https://localhost:3000/static"),
    //       handler: "StaleWhileRevalidate"
    //     }
    //   ]
    // })
    new WorkboxPlugin.InjectManifest({
      swSrc: "./web/src/utils/sw.js",
      swDest: "sw.js"
    })
  ]
};
