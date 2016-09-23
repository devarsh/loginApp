/* eslint-disable */
import { serverEndPoint } from '../../../config/server.js'
import { resolve } from 'url'

const authenticationRequestMaker = (username, password) => ({
  link: resolve(serverEndPoint, 'users'),
  method: 'GET',
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Authorization: `Basic ${btoa(`${username}:${password}`)}`
  }
})

const ResetPasswordRequest = (email) => ({
  link: resolve(serverEndPoint, 'users/forgot/password'),
  method: 'POST',
  mode: 'cors',
  headers: {
    Aceept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
})
export const isLoggedIn = () => !!localStorage.token

export const getToken = () => localStorage.token

export let onChange = function () { }

export const login = function (username, password, cb) {
  cb = arguments[arguments.length-1]
  const token = getToken()
  if (token) {
    this.onChange(true)
    if (cb) return cb(true)
  }
  const reqObj = authenticationRequestMaker(username, password)
  fetch(reqObj.link, reqObj).then(res => res.json()).then(data => {
    if (data.authenticated) {
      localStorage.token = data.token
      if (cb) {
        this.onChange(true)
        cb(true)
      }
    }
    else {
      if (cb) {
        this.onChange(false)
        cb(false)
      }
    }
  })
}

export const logout = function (cb) {
  delete localStorage.token
  this.onChange(false)
  if (cb) cb(false)
}
