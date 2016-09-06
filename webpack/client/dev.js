var webpack = require('webpack')
var base = require('./base.js')
var defaults = require('./defaults.js')
var path = require('path')

//add addition loaders ,if a loader exists in base then it will be overridden
defaults.loaders.addLoaders({
	loaders : [
		{
			test: /\.(js|jsx)$/,
  			loader: 'react-hot!babel-loader',
  			include: defaults.srcPath
		}
	]
})

module.exports  = Object.assign({},base,{
	entry : [
		'babel-polyfill',
    `webpack-hot-middleware/client?path=http://${defaults.host}:${defaults.port}/__webpack_hmr&overlay=false`,
		path.join(defaults.srcPath,'./index.js')
	],
	cache : false,
	devtool: 'eval-source-map',
	module : defaults.loaders.getLoaders(),
	plugins: [
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoErrorsPlugin(),
    	new webpack.DefinePlugin({
	      __CLIENT__: true,
	      __SERVER__: false,
	      __DEVELOPMENT__: true,
	    }),
  	]
})
