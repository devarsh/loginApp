import React from 'react'

import Layout from 'templates/components/Layout'
import Header from 'templates/components/Header'
import Body from 'templates/components/Body'
import Button from 'templates/components/Button'

import classnames from 'classnames'

import Oy from 'oy-vey'

const { A } = Oy

import cssOut from 'templates/components/commonCss'


const renderEmail = (title, previewText) => (username, link) =>
  Oy.renderTemplate(
    <Layout>
      <Header color="#134ac0" />
      <Body>
        <p>Hi <b>{username}</b>, </p>
        <p>Someone recently requested a password change for your App account. If this was you, you can set a new password here: </p>
        <p><Button name="Reset Password" link={link} /></p>
        <p>If you don't want to change your password or didn't request this, just ignore and delete this message.</p>
        <p>To keep your account secure, please don't forward this email to anyone.</p>
        <p>Hope to see you soon! </p>
        <p>Love,<br/>Team App</p>
      </Body>
    </Layout>
  , {
    title,
    previewText,
    headCSS: cssOut
  })

export default renderEmail('Reset your App Password','Reset your App Password')
