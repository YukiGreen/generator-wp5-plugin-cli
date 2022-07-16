var webpack = require("webpack");
var path = require("path");
var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackConfig = require('../webpack.lib.conf.js');

var compiler = webpack(webpackConfig);

var webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
  writeToDisk: true, 
  // watchOptions: {aggregateTimeout: 3000, poll: true}
});

var app = express();
app.use(webpackDevMiddlewareInstance);
app.listen("8080", function(err) {
   console.log("dev server start: listening at " + "8080");
   if (err) {
     console.error(err);
   }
})