"use strict";
const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");

const HOST = utils.getNetworkIp();
const PORT = process.env.PORT && Number(process.env.PORT);
// const manifest = path.resolve(config.dll.output, "manifest.json");

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  // devtool: config.dev.devtool,
  devtool: "eval-source-map",
  target: 'web',

  // these devServer options should be customized in /config/index.js
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, "index.html")
        }
      ]
    },
    allowedHosts: 'all',
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    hot: true,
    // compress: true,
    
    compress: false,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable,
    // clientLogLevel: "warning",
    // historyApiFallback: true,
    // contentBase: false, // since we use CopyWebpackPlugin.??
    // inline: config.dev.inline,
    // overlay: config.dev.errorOverlay
    //   ? { warnings: false, errors: true }
    //   : false,
    // publicPath: config.dev.assetsPublicPath,
    // quiet: true // necessary for FriendlyErrorsPlugin
  },
  watchOptions: {
    poll: config.dev.poll
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env")
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser"
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html"
      // inject: true,
      // hash: true,
      // favicon: resolve('public/favicon.ico'),
      // path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../public"),
        to: config.dev.assetsSubDirectory,
        ignore: [".*"]
      },
    ])
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `  App running at:`,
              `  - Local:    http://localhost:${port}`,
              `  - Network:  http://${HOST}:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
