/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import User from 'models/users'
import { generateToken, verifyToken } from 'controller/token'

passport.use(new BasicStrategy((username, password, cb) => {
  User.findOne({ name: username }, (err, user) => {
    if (err) return cb(err)
    if (!user) return cb(null, { authenticated: false })
    user.verifyPassword(password, (err1, isMatch) => {
      if (err1) return cb(err1)
      if (!isMatch) return cb(null, { authenticated: false })
      generateToken(user, (token) => cb(null, { token: token, authenticated: true }))
    })
  })
}))

passport.use(new BearerStrategy((accessToken, cb) => {
  verifyToken(accessToken, (err, token) => {
    if (err) return cb(null, { tokenInvalid: true })
    return cb(null, { tokenInvalid: false, token }, { scope: '*' })
  })
}))


export const isAuthenticated = passport.authenticate('basic', { session: false })
export const isAuthorized = passport.authenticate('bearer', { session: false })
