var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var srcPath = path.join(__dirname,'../../src/server')
var basePath = path.join(__dirname,'../../')
var nodeModules = fs.readdirSync(path.join(basePath,'./node_modules'))
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  });

module.exports = {
  entry: [
  'regenerator-runtime/runtime',
  path.join(srcPath, './index.js')
  ],
  resolve: {
    extensions: ['','.js','.jsx'],
    modules: [srcPath,path.join(basePath,'./node_modules')],
    alias: {
      config: path.join(basePath,'./config'),
      controllers: path.join(srcPath,'./controllers'),
      models: path.join(srcPath,'./models'),
      templates: path.join(srcPath,'./templates'),
      helpers: path.join(srcPath,'./helpers'),
      services: path.join(srcPath,'./services'),
      middlewares: path.join(srcPath,'./middlewares')
    },
  },
  module: {
    preLoaders: [
     /* {
        test: /\.(js|jsx)$/,
        include: __dirname,
        loader: 'eslint-loader',
        include: path.join(basePath, './src/server'),
        exclude: path.join(basePath, './node_modules')
      } */
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.join(basePath, './src/server'),
        exclude: path.join(basePath, './node_modules')
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.(htm|html)$/,
        loader: 'html-loader'
      },
    ]
  },
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [
    function(context, request, callback) {
      var pathStart = request.split('/')[0]
      if (nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
        return callback(null, "commonjs " + request)
      }
      callback()
    }
  ],
  target: 'node',
  devtool : 'sourcemap',
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false }),
    new webpack.HotModuleReplacementPlugin({ quiet: true })
    ],
  output: {
      path: path.join(basePath, './static/'),
      filename: 'serverBundle.js',
    },
}

//example http://jlongster.com/Backend-Apps-with-Webpack--Part-I
//https://github.com/jlongster/backend-with-webpack
