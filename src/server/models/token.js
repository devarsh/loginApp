/* eslint-disable prefer-arrow-callback */
import mongoose from 'mongoose'
import { findOne, save, updateOne } from 'models/wrapper'
const { ObjectId } = mongoose.Schema

const TokenSchema = new mongoose.Schema({
  token: { type: String, unique: true, required: true },
  expiresAt: { type: Number, required: true },
  usedOnce: { type: Boolean, required: true, default: false },
  issuedFor: { type: String, required: true },
  user: { type: ObjectId, ref: 'Users', required: true },
})

TokenSchema.pre('findOne', function (next) {
  let token = this
  if (token.options.comment) {
    const conditions = token.options.comment.split(',')
    if (!conditions.includes('No:Lean')) {
      token.lean()
    }
  } else {
    token.lean()
  }
  next()
})

TokenSchema.methods._updateOne = function(fieldObj) {
  return updateOne(this, fieldObj)
}

TokenSchema.statics._save = function(fieldObj) {
  return save(Token, fieldObj)
}

TokenSchema.statics._findOne = function(fieldObj,comment,populate) {
  return findOne(this, fieldObj, comment, populate)
}

/*TokenSchema.methods.updateToken = function (expiresAt) {
  const tokenInstance = this
  tokenInstance.expiresAt = expiresAt
  tokenInstance.usedOnce = true
  return new Promise((resolve, reject) => {
    tokenInstance.save(function (err, user) {
      if (err) return reject(err)
      return resolve(user.toObject())
    })
  })
}

TokenSchema.statics.newToken = function (token, expiresAt, issuedFor, user) {
  const tokenInstance = new Token({
    token,
    expiresAt,
    issuedFor,
    user
  })
  return new Promise((resolve, reject) => {
    tokenInstance.save(function (err, savedToken) {
      if (err) return reject(err)
      return resolve(savedToken.toObject())
    })
  })
}

TokenSchema.statics.getToken = function (token) {
  return findOne(this, { token: testEqual(token) },['user', '-password'])
}

TokenSchema.statics.getToken_i = function (token) {
  return findOne(this, { token: testEqual(token) },'No:Lean',['user', '-password'])
}

TokenSchema.statics.getTokenByUserId = function(userId, purpose) {
  return this.find({ user: testEqual(token), usedOnce: false  })
  .lean()
} */

const Token = mongoose.model('Tokens', TokenSchema)
export default Token
