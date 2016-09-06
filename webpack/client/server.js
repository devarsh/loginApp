/*eslint no-console:0 */
'use strict';
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./dev.js')
const defaultConfig = require('./defaults.js')
const compiler = webpack(config)
const Express = require('express')
const path = require('path')
const fs = require('fs')
const serverOptions =  {
    contentBase : defaultConfig.srcPath,
    historyApiFallback : true,
    hot : true,
    port : defaultConfig.port,
    publicPath : defaultConfig.publicPath,
    noInfo : false,
    stats : { color:true,reasons:false,errorDetails:true,modules:false},
    quite : false,
    lazy : false
  }

const app = new Express()

app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

app.get('*',(req,res) => {
  res.set('Content-Type','text/html')
  res.sendFile(path.join(defaultConfig.srcPath, 'index.html'))
})

app.listen(defaultConfig.port,defaultConfig.host, function onAppListening(err) {
  if (err) {
    console.error(`❌\n${err}`)
  } else {
    console.info(`==> 🌎 Webpack development server listening on ${defaultConfig.host}:${defaultConfig.port} `)
  }
})




