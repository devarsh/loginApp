import jwt from 'jsonwebtoken'
import uuid from 'node-uuid'
import { jwtEncrKey } from '../../../config/server.js'

export const generateToken = ({ email, name, _id }, cb) => {
  const userToken = jwt.sign({ email, username: name }, jwtEncrKey,
    {
      expiresIn: '2h',
      issuer: `${_id}`,
      jwtid: uuid.v4()
    }
  )
  return cb(userToken)
}

export const verifyToken = (token, cb) => {
  jwt.verify(token, jwtEncrKey, (err, decoded) => {
    if (err) return cb(true)
    return cb(null, decoded)
  })
}
