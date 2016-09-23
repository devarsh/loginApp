 const config = require('../../../config/server')
const { mailgun : mailgunConfig } = config
var mailgun = require('mailgun-js')({ apiKey: mailgunConfig.key, domain: mailgunConfig.domain })
import AppError from 'helpers/errorHandler'

const RESET_TMPL = { tmpl: 'resetPassword', subject: 'Reset your App Password' }
const REST_CONFIRM = { tmpl:'resetPasswordConfirmation', subject: `You've successfully reset your App password` }
const EMAIL_VERIFY = { tmpl: 'emailVerify', subject: 'Verify Your App Email' }

const req = require.context('templates',true,/^\.\/.*\.(js|jsx)$/)


const sendEmail = (TEMPLATE) => (userObj,link ='#') => {
  const { email, username } = userObj
  return new Promise((resolve, reject) => {
    var resetEmail = req(`./${TEMPLATE.tmpl}.jsx`).default
    const data = {
    from: 'no-reply@TheApp.com',
    to: email,
    subject: `${TEMPLATE.subject}`,
    html: resetEmail(username, link)
    }
    mailgun.messages().send(data)
    .then(ack => {
      if(ack.id) {
        resolve(ack)
      } else {
        reject(new AppError({ message: 'Failed to deliver your message'}))
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const sendResetPwdReqEmail = sendEmail(RESET_TMPL)
export const sendResetPwdAlertEmail = sendEmail(REST_CONFIRM)
export const sendEmailVerificationEmail = sendEmail(EMAIL_VERIFY)
