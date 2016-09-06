/* eslint-disable  no-unused-vars */
import {
  LOGIN_REQ, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGIN_TIMEOUT, NOT_LOGGED_IN } from 'const/const.js'

const auth = require('utils/auth')

export const doLogin = (username, password, cb) => (dispatch, getState) => {
  dispatch(loginReq())
  auth.login(username, password, (isLoggedIn) => {
    if (isLoggedIn) {
      cb(true)
      dispatch(loginSuccessful())
    } else {
      cb(false)
      dispatch(loginFailure('Invalid username and password'))
    }
  })
}

export const doLogout = (cb) => (dispatch, getState) => {
  auth.logout(()=> {
    dispatch(notLoggedIn())
    cb()
  })
}

export const loginSuccessful = () => ({
  type: LOGIN_SUCCESS
})

export const loginFailure = (errorMsg) => ({
  type: LOGIN_FAILURE,
  errorMsg
})

export const loginReq = () => ({
  type: LOGIN_REQ
})

export const notLoggedIn = () => ({
  type: NOT_LOGGED_IN
})
