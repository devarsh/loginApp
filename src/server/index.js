import express from 'express'
import bodyParser from 'body-parser'
import { port, adr, connectionString } from '../../config/server.js'
import { postUsers, getUsers } from 'controller/user'
import mongoose from 'mongoose'
import passport from 'passport'
import { isAuthenticated, isAuthorized } from 'controller/auth'

/* eslint-disable new-cap */
const router = express.Router()
const app = new express()
mongoose.connect(connectionString)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
// enable cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Authorization')
  next()
})
app.use('/api', router)

router.route('/users')
  .get(isAuthenticated, getUsers)
  .post(postUsers)

router.route('/dashboard')
  .get(isAuthorized, (req, res) => res.json(req.user))

app.listen(port, adr, (err) => {
  if (!err) {
    console.log(`server running at ${adr}:${port}`)
  }
})
