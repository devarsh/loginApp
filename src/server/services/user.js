import User from 'models/users'
import { emailGenerateToken, emailVerifyToken,
  resetPwdGenerateToken, resetPwdVerifyToken,
  resetToken, verfiyResetToken,
  generateJwtToken, verifyJwtToken,
  invalidateToken } from 'services/token'
import { sendEmailVerificationEmail,
  sendResetPwdReqEmail, sendResetPwdAlertEmail } from 'services/emailDispatch'
import Match from 'helpers/exactMatch'
const testEqual = Match(false)

const getPublicFields = (obj) => {
  const currentFields = Object.keys(obj)
  const requiredFields = ['email','username','phone','_id']
  const final = currentFields.reduce((prev,curr) => {
    if(requiredFields.includes(curr)) {
      prev[curr] = obj[curr]
    }
    return prev
  },{})
  return final
}

export const registerUser = async (req, res) => {
  try {
    const { email, username, password, phone  } = req.body
    const user =  await User._save({ email, username, password, phone })
    const publicUser = getPublicFields(user)
    const genToken = await emailGenerateToken(publicUser)
    const emailLink = `http://localhost:8000/users/email/verify/${genToken}`
    const ack = await sendEmailVerificationEmail(publicUser, emailLink)
    res.send('User sucessfully added')
  } catch (err) {
    console.log(err)
  }
}

export const verfiyUserEmail = async (req, res) => {
  try {
    const { token } = req.body
    const verifiedToken = await emailVerifyToken(token)
    const userInstance = await User._findOne({ _id: verifiedToken.user._id },'No:Lean')
    const updateUser = await userInstance._updateOne({ emailVerified: true })
    const isTokenInvalid = await invalidateToken(verifiedToken)
    if(isTokenInvalid) {
      res.send('Thank-you for verifying your email')
    }
  } catch (err) {
    console.log(err)
  }
}

export const doLogin = async (username, password) => {
  try {
    const userInstance = await User._findOne({
      $or: [
      { email: testEqual(username) },
      { username: testEqual(username) }
      ]
    },'No:Lean,Yes:Pwd')
    const isValid = await userInstance.verifyPassword(password)
    const accessToken = await generateJwtToken(userInstance)
    return accessToken
  } catch (err) {
    throw err
  }
}

export const generateResetPasswordLink = async (req, res) => {
  try {
    const { username } = req.body
    const user = await User._findOne({
      $or: [
      { email: testEqual(username) },
      { username: testEqual(username) }
      ]
    })
    const publicUser = getPublicFields(user)
    const genToken = await resetPwdGenerateToken(publicUser)
    const emailLink = `http://localhost:8000/users/password/forgot/verify/${genToken}`
    const ack = await sendResetPwdReqEmail(publicUser, emailLink)
    res.send('Password reset link sent to your registered email id')
  } catch (err) {
    console.log(err)
  }
}

export const verifyResetPasswordLink = async (req, res) => {
  try {
    const { token } = req.body
    const verifiedToken = await resetPwdVerifyToken(token)
    const genToken = await resetToken(verifiedToken.user)
    const isTokenInvalid = await invalidateToken(verifiedToken)
    if(isTokenInvalid) {
      res.send(genToken)
    }
  } catch (err) {
    console.log(err)
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body
    const verifiedToken = await verfiyResetToken(token)
    const email = verifiedToken.user.email
    const userInstance = await User._findOne({ email: testEqual(email) },'No:Lean')
    const updatedUser = await userInstance._updateOne({ password: password })
    const isTokenInvalid = await invalidateToken(verifiedToken)
    const publicUser = getPublicFields(updatedUser)
    console.log(publicUser)
    const ack = await sendResetPwdAlertEmail(publicUser)
    if(isTokenInvalid) {
      res.send('User password successfully changed')
    }
  } catch (err) {
    console.log(err)
  }
}





