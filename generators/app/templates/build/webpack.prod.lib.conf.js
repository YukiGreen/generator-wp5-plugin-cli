const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
const vueLoaderConfig = require("./vue-loader.conf");
const threadLoaderConfig = require("./thread-loader.conf");
const utils = require("./utils");
const resolveApp = require("./paths");
// const TerserPlugin = require("terser-webpack-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const config = require("../config");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const webpackConfig = {
  context: resolveApp("./"),
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: resolveApp("./lib"),
    filename: "index.js",
    chunkFilename: "[id].js",
    libraryTarget: "umd",
    // publicPath: "./"
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minChunks: 2
    }
  },
  // node: {
  //     fs: "empty"
  // },
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".vue",
      ".json",
      ".less",
      ".css",
      ".scss"
    ],
    alias: {
      plugin: resolve("src"),
      packages: resolve("packages")
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
  performance: {
    hints: "warning"
  },
  // stats: 'none',
  externals: {
    Vue: "vue",
    vue: "vue",
    vuex: "vuex",
    'vue-router': "VueRouter",
    'lodash': "lodash",
    'element-ui': "element-ui",
    'moment': "moment",
  },
  module: {
    rules: [
      // ...utils.styleLoaders({
      //   sourceMap: config.build.productionSourceMap,
      //   extract: true,
      //   usePostCSS: true,
      // }),
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              esModule: false
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 3,
              esModule: false,
            },
          },
          "postcss-loader",
          "less-loader",
          {
            loader: "style-resources-loader",
            options: {
              patterns: [
                path.resolve(
                  __dirname,
                  "../src/styles/themes/base/vars/index.less"
                ),
              ],
              injector: "prepend",
            },
          },
        ],
      },
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
        use: [
          "cache-loader",
          { loader: "thread-loader", ...threadLoaderConfig },
          "babel-loader"
        ],
        include: [
          resolve("src"),
          resolve("packages"),
          resolve("test"),
          resolve("node_modules/resize-detector")
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 25 * 1024,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 25 * 1024,
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 25 * 1024,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/prod.env")
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          reduce_vars: true,
          drop_debugger: true,
          drop_console: true,
        },
        parallel: true,
        cache: true,
        output: {
          beautify: false
        }
      },
      sourceMap: false,
      parallel: true,
    }),
    // new MiniCssExtractPlugin({
    //   filename: utils.assetsPath("css/[name].css"),
    // }),
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: config.build.productionSourceMap
    //     ? { safe: true, map: { inline: false } }
    //     : { safe: true },
    // }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
  ]
};

if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
