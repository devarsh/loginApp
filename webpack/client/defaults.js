var path = require('path')
var host = 'localhost'
var port = '8000'
var basePath = path.join(__dirname,'../../')
var srcPath = path.join(__dirname,'../../src/browser/')
var outputPath = path.join(__dirname,'../static/dist')
var publicPath = `http://${host}:${port}/assets/`
var target = 'web'
function loaders(options) {
	this.common = {
		preLoaders: [
		      /*{
		        test: /\.(js|jsx)$/,
		        include: srcPath,
            exclude: path.join(basePath,'./node_modules'),
		        loader: 'eslint-loader'
		      }*/
		    ],
	    loaders: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.sass/,
				loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader?outputStyle=expanded&indentedSyntax'
			},
			{
				test: /\.scss/,
				loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader?outputStyle=expanded'
			},
			{
				test: /\.less/,
				loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
			},
			{
				test: /\.styl/,
				loader: 'style-loader!css-loader!autoprefixer-loader!stylus-loader'
			},
			{
				test: /\.(png|jpg|gif|ico|svg|jpeg)$/,
				loader: 'url-loader?limit=10000&name=img/img-[hash:6].[ext]'
			},
			{
				test: /\.(woff|woff2)$/,
				loader: 'url-loader?limit=100000&name=font/font-[hash:6].[ext]'
			},
			{
				test: /\.(ttf|eot)$/,
				loader: 'file-loader'
			},
			{
				test: /\.(wav|mp3)$/,
				loader: 'file-loader'
			},
			{
				test: /\.(htm|html)$/,
				loader: 'html-loader'
			},
			{
				test: /\.(md|markdown)$/,
				loader: 'html-loader|markdown-loader'
			},
			{
				test: /\.(txt)$/,
				loader: 'raw-loader'
			}
	    ]
	}
}

/******** utility functions to add loaders ************/
loaders.prototype.getLoaders = function() {
	return this.common
}

loaders.prototype.addLoaders = function(newLoaders) {
	var keys = ['preLoaders','loaders','postLoaders','noParse']
	var defaultLoaders = this.getLoaders()
	var defaultKeys = Object.keys(defaultLoaders)
	var newLoadersKeys = Object.keys(newLoaders)
	var newCommon = keys.reduce((cumm,current)=> {
		var old = defaultLoaders[current] || []
		var new1 = newLoaders[current] || []
		var merged = mergeArrayByProperty(old,new1,'test')
		cumm[current] = merged
		return cumm
	},{})
	this.common = newCommon
}

function mergeArrayByProperty(first, second, propToCompare) {
	debugger
	if(second.length) {
		if(first.length) {
			var newArray = []
			second.forEach((obj) => {
				var found = false
				first.every((obj2,index)=>{
					if(obj[propToCompare].toString() === obj2[propToCompare].toString()) {
						newArray.push(obj)
						first.splice(index,1)
						found = true
						return false
					}
					return true
				})
				if(!found) {
					newArray.push(obj)
				}
			})
			if(first.length) {
				return newArray.concat(first)
			}
			else {
				return newArray
			}
		}
		return second
	}
	else if(first.length) {
		return first
	}
	else {
		return []
	}
}
/********End utility functions to add loaders ************/
module.exports = {
	host,
	port,
	srcPath,
	basePath,
	outputPath,
	publicPath,
  target,
	loaders : new loaders()
}
