"use strict";
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");
const { VueLoaderPlugin } = require("vue-loader");
const threadLoaderConfig = require("./thread-loader.conf");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: "eslint-loader",
  enforce: "pre",
  include: [resolve("src"), resolve("test")],
  options: {
    formatter: require("eslint-friendly-formatter"),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});
let entry = "";
let address = "";
if (process.env.entry === "docs") {
  entry = "./docs/main.ts";
  address = "docs";
} else {
  entry = "./examples/main.ts";
  address = "examples";
}
module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: entry
  },
  output: {
    // path: config.build.assetsRoot,
    filename: "[name].js",
    // publicPath:
      // process.env.NODE_ENV === "production"
      //   ? config.build.assetsPublicPath
      //   : config.dev.assetsPublicPath
      // "http://localhost:9090/"
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve(address),
      plugin: resolve("src")
    },
    fallback: {
      path: require.resolve("path-browserify"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      crypto: require.resolve("crypto-browserify"),
      fs: false,
      buffer: require.resolve("buffer/"),
      stream: require.resolve("stream-browserify"),
      timers: require.resolve("timers-browserify")
    }
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        use: [
          "cache-loader",
          { loader: "thread-loader", ...threadLoaderConfig },
          {
            loader: "vue-loader",
            options: vueLoaderConfig
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "cache-loader",
          { loader: "thread-loader", ...threadLoaderConfig },
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              appendTsxSuffixTo: [/\.vue$/],
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [
          resolve("packages"),
          resolve("test"),
          // resolve("node_modules/webpack-dev-server/client"),
          resolve("node_modules/pte-template"),
          resolve("node_modules/vue-echarts")
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        options: {
          symbolId: "[name]"
        },
        include: [resolve("src/assets/svg")]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        },
        exclude: [resolve("src/assets/svg")]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, "./md-loader/index.js"),
            options: {
              row: true
            }
          }
        ]
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    // setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    global: true
    // dgram: "empty",
    // fs: "empty",
    // net: "empty",
    // tls: "empty",
    // child_process: "empty"
  }
};
