"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");
const version = require('../src/Controls.json').version;
const proxyJson = require("../src/proxy.json");
// const dllEntry = require('./dllEntry.json');

// 获取代理
function getProxy(proxyJson, version) {
  const devServerProxy = {};
  proxyJson.forEach(function (item) {
    let proxyUrl = '';
    if (item.proxyUrl === '/loader' || item.notVersion) {
      // 不需要带版本号
      // 壳子服务不需要版本
      proxyUrl = item.proxyUrl;
    } else {
      proxyUrl = item.proxyUrl + '/' + version;
    }
    devServerProxy[proxyUrl] = {
      target: item.targetApi,
      ws: item.protocol === 'ws://',
      changeOrigin: item.changeOrigin,
      secure: false,
    };
    if (!item.notPathRewrite) {
      if (item.pathRewrite) {
        devServerProxy[proxyUrl]['pathRewrite'] = item.pathRewrite;
      } else {
        devServerProxy[proxyUrl]['pathRewrite'] = {};
        devServerProxy[proxyUrl]['pathRewrite'][proxyUrl] = '';
      }
    }
  });
  return devServerProxy;
}

module.exports = {
  dev: {
    // Paths
    assetsRoot: path.resolve(__dirname, '../'),
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    proxyTable: getProxy(proxyJson, version), // 代理
    inline: true, // 是否热部署
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9090, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    
    // assetsSubDirectory: "static",
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: true
  },

  // dll: {
  //   filename: './js/[name].js', // 文件名
  //   publicPath: '/', // 公共目录
  //   entry: dllEntry, // 入口
  //   output: path.resolve(__dirname, '../vendor'), // 出口
  // },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: '',
    // assetsSubDirectory: "static",
    assetsPublicPath: "./",

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "nosources-source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
