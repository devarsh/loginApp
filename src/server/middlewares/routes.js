import express from 'express'
const router = express.Router()
import { registerUser, verfiyUserEmail,
  generateResetPasswordLink, verifyResetPasswordLink,
  resetPassword } from 'services/user'
import { isAuthenticated } from 'services/auth'

router.route('/users')
  .get(isAuthenticated, (req, res) => res.json(req.user))
  .post(registerUser)

router.route('/users/email/verify')
  .post(verfiyUserEmail)

router.route('/users/password/forgot')
  .post(generateResetPasswordLink)

router.route('/users/password/forgot/verify')
  .post(verifyResetPasswordLink)

router.route('/users/password/rest')
  .post(resetPassword)



export default router

