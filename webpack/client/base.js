'use strict'
var path = require('path')
var defaultConfig = require('./defaults.js')
module.exports = {
	context : defaultConfig.basePath,
	resolve : {
		extensions: ['','.js','.jsx'],
  	alias : {
  		actions   : path.join(defaultConfig.srcPath,'./actions'),
    	components: path.join(defaultConfig.srcPath,'./components'),
   		const    : path.join(defaultConfig.srcPath,'./const'),
    	reducers   : path.join(defaultConfig.srcPath,'./reducers'),
    	utils     : path.join(defaultConfig.srcPath,'./utils')
    },
    modulesDirectories: ["src", "node_modules"]
	},
	output : {
		path: defaultConfig.outputPath,
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: defaultConfig.publicPath
	},
  target : 'web',
  devtool : 'eval-source-map',
  module : {},
}
