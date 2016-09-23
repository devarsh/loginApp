/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import error from 'helpers/errorHandler'
import { doLogin } from 'services/user'


passport.use(new BasicStrategy( async (username, password, cb) => {
  try {
    const token = await doLogin(username, password)
    cb(null, {sucess: true, message: token})
  } catch (err) {
    console.log(err)
    cb(null, {sucess: false, message: err})
  }
}))

/*passport.use(new BearerStrategy( async (accessToken, cb) => {
  verifyJwtAccessToken(accessToken)
  .then(decodedToken => {
    cb(null, successMsg(decodedToken), { scope: '*' })
  })
  .catch(err => {
    cb(null, failMsg(err))
  })
})) */


export const isAuthenticated = passport.authenticate('basic', { session: false })
//export const isAuthorized = passport.authenticate('bearer', { session: false })
