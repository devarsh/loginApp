/* eslint-disable no-underscore-dangle */
import { jwtEncrKey } from '../../../config/server.js'
import jwt from 'jsonwebtoken'
import uuid from 'node-uuid'
import Token from 'models/token'
import ms from 'ms'
import AppError from 'helpers/errorHandler'
import btoa from 'btoa'
import atob from 'atob'

const ISSUED_FOR_RESET = 'RESET_REQUEST'
const ISSUED_FOR_RESET_PWD = 'RESET_PASSWORD'
const ISSUED_FOR_VERIFY_EMAIL = 'EMAIL'
const ISSUED_FOR_ACCESS = 'ACCESS'

export const generateJwtToken = ({ email, username, _id },timelimit='24hrs') =>
  new Promise((resolve, reject) => {
    jwt.sign(
      { email, username },
      jwtEncrKey,
      { expiresIn: timelimit, issuer: `${_id}`, jwtid: uuid.v4() },
      (err, token) => {
        if (err) return reject(err)
        return resolve(token)
      }
    )
  })

export const verifyJwtToken  = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, jwtEncrKey, (err, decoded) => {
      if (err) return reject(err)
      return resolve(decoded)
    })
  })

const calculateTokenExpTime = (duration, issuedTimestamp) => {
  const timestamp = (issuedTimestamp && (issuedTimestamp / 1000)) || Math.floor(Date.now() / 1000)
  if (typeof duration === 'string') {
    const milliseconds = ms(duration)
    if (typeof milliseconds === 'undefined') {
      return
    }
    return Math.floor(timestamp + milliseconds / 1000)
  } else if (typeof duration === 'number') {
    return timestamp + duration
  } else {
    return
  }
}

const isExpiredToken = (exp, clockTolerance) => {
  if (Math.floor(Date.now() / 1000) >= exp + (clockTolerance || 0)) {
    return true
  } else {
    return false
  }
}

const generateToken = (issuedFor, expireLimit='24hrs') => async (userInstance) => {
  try {
    const token = uuid.v4()
    const expiresAt = calculateTokenExpTime(expireLimit)
    const tokenInst = await Token._save({ token, expiresAt, issuedFor, user: userInstance._id })
    return btoa(token)
  } catch (err)  {
    throw err
  }
}

const verifyToken = (issuedFor) => async (token) => {
  try {
    console.log(token)
    token = atob(token)
    console.log(token)
    const tokenInst = await Token._findOne({ token },'No:Lean',['user','-password'])
    if (tokenInst.issuedFor === issuedFor) {
      const isExpired = isExpiredToken(tokenInst.expiresAt)
      if (isExpired) {
        throw AppError({ message: 'Token already Expired' })
      } else {
        return tokenInst
      }
    } else {
      throw AppError({ message: 'Invalid token request' })
    }
  } catch (err) {
    throw err
  }
}

export const invalidateToken = async (tokenInst) => {
  try {
    const updatedToken = await tokenInst._updateOne({
      expiresAt: calculateTokenExpTime('1ms'),
      usedOnce: true
    })
    if(updatedToken.usedOnce === true) {
      return true
    } else {
      throw AppError({ message: 'Failed to invalidate the token'})
    }
  } catch (err) {
    throw err
  }
}

export const resetPwdGenerateToken = generateToken(ISSUED_FOR_RESET)
export const resetPwdVerifyToken = verifyToken(ISSUED_FOR_RESET)
export const emailGenerateToken = generateToken(ISSUED_FOR_VERIFY_EMAIL)
export const emailVerifyToken = verifyToken(ISSUED_FOR_VERIFY_EMAIL)
export const resetToken = generateToken(ISSUED_FOR_RESET_PWD)
export const verfiyResetToken = verifyToken(ISSUED_FOR_RESET_PWD)

