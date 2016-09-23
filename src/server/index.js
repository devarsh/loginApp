import { port, adr, connectionString, apiVersion, apiEndPointPath } from '../../config/server.js'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'

import cors from 'middlewares/cors'
import router from 'middlewares/routes'

mongoose.connect(connectionString)
mongoose.Promise = global.Promise

const app = new express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(cors)
app.use(`/${apiVersion}/${apiEndPointPath}`, router)
app.get(`/${apiVersion}/${apiEndPointPath}`, (req, res) => {
  res.send('Api server running :)')
})

app.listen(port, adr, (err) => {
  if (!err) {
    console.log(`server running at ${adr}:${port}`)
  }
})
