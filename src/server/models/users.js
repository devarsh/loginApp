import mongoose from 'mongoose'
import brcypt from 'bcrypt-nodejs'

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  name: { type: String, unique: true, required: true, index: true },
  phone: { type: String }
})

UserSchema.pre('save', function (cb) {
  /* eslint-disable prefer-const */
  let user = this
  /* eslint-disable consistent-return */
  brcypt.genSalt(10, (err, salt) => {
    if (err) return cb(err)
    brcypt.hash(user.password, salt, null, (err1, hash) => {
      if (err) return cb(err1)
      user.password = hash
      cb()
    })
  })
})

UserSchema.methods.verifyPassword = function (password, cb) {
  brcypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

export default mongoose.model('Users', UserSchema)
