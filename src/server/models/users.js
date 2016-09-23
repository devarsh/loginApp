/* eslint-disable prefer-arrow-callback, no-use-before-define */
import mongoose from 'mongoose'
import brcypt from 'bcrypt-nodejs'
import { findOne, save, updateOne } from 'models/wrapper'
import AppError from 'helpers/errorHandler'

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  username: { type: String, unique: true, required: true, index: true },
  phone: { type: String },
  emailVerified: { type: Boolean, required: true, default: false },
})

UserSchema.pre('save', function (next) {
  /* eslint-disable prefer-const */
  let user = this
  /* eslint-disable consistent-return */
  brcypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    brcypt.hash(user.password, salt, null, (err1, hash) => {
      if (err) return next(err1)
      user.password = hash
      next()
    })
  })
})

UserSchema.pre('findOne', function (next) {
  let user = this
  if (user.options.comment) {
    const conditions = user.options.comment.split(',')
    if (!conditions.includes('No:Lean')) {
      user.lean()
    }
    if (!conditions.includes('Yes:Pwd')) {
      user.select('-password')
    }
  } else {
    user.lean().select('-password')
  }
  next()
})

UserSchema.methods.verifyPassword = function (password) {
  let userInstance = this
  return new Promise((resolve, reject) => {
    brcypt.compare(password, userInstance.password, (err, isMatch) => {
      if (err) return reject(err)
      if(!isMatch) {
        reject(AppError({ message : 'Password failed to match' }))
      }
      resolve(isMatch)
    })
  })
}

UserSchema.methods._updateOne = function(fieldObj) {
  return updateOne(this,fieldObj)
}

UserSchema.statics._save = function(fieldObj) {
  return save(User,fieldObj)
}

UserSchema.statics._findOne = function(fieldObj,comment,populate) {
  return findOne(this,fieldObj,comment,populate)
}

/*UserSchema.methods.verifyEmail = function () {
  let userInstance = this
  userInstance.emailVerified = true
  return new Promise((resolve, reject) => {
    userInstance.save(function (err, user) {
      if (err) return reject(err)
      return resolve(user.toObject())
    })
  })
}

UserSchema.methods.updatePassword = function (newPassword) {
  let userInstance = this
  userInstance.password = newPassword
  return new Promise((resolve, reject) => {
    userInstance.save(function (err, user) {
      if (err) return reject(err)
      return resolve(user.toObject())
    })
  })
}

UserSchema.statics.newUser = function (email, password, username, phone, emailVerified = false) {
  const userInstance = new User({
    email,
    password,
    username,
    phone,
    emailVerified
  })
  return new Promise((resolve, reject) => {
    userInstance.save(function (err, user) {
      if (err) return reject(err)
      return resolve(user.toObject())
    })
  })
}

UserSchema.statics.getUserByEmailOrId = function (emailOrUsername) {
  return findOne(this,{ $or: [
    { email: testEqual(emailOrUsername) },
    { username: testEqual(emailOrUsername) }
    ] })
}

UserSchema.statics.getUserByEmailOrId_i = function (emailOrUsername) {
  return findOne(this,
    { $or: [
      { email: testEqual(emailOrUsername) },
      { username: testEqual(emailOrUsername) }
    ] },
    'No:Lean,Yes:Pwd')
}

UserSchema.statics.emailExists = function (email) {
  return findOne(this, { email: testEqual(email) })
}

UserSchema.statics.usernameExists = function (username) {
  return findOne(this, { username: testEqual(username) })
} */

const User = mongoose.model('Users', UserSchema)
export default User
