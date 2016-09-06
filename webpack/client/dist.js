var webpack = require('webpack')
var base = require('./base.js')
var defaults = require('./defaults.js')
var path = require('path')

//add addition loaders ,if a loader exists in base then it will be overridden
defaults.loaders.addLoaders({
	loaders : [
		{
			test: /\.(js|jsx)$/,
  			loader: 'babel-loader',
  			include: defaults.srcPath
		}
	]
})

module.exports  = Object.assign({},base,{
	entry : path.join(defaults.srcPath,'./index.js'),
  target : defaults.target,
	cache : false,
	devtool: 'sourcemap',
	module : defaults.loaders.getLoaders(),
	plugins: [
    	new webpack.optimize.DedupePlugin(),
    	new webpack.DefinePlugin({
      		'process.env.NODE_ENV': '"production"'
    	}),
	    new webpack.optimize.UglifyJsPlugin(),
	    new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.optimize.AggressiveMergingPlugin(),
	    new webpack.NoErrorsPlugin(),
  	]
})
