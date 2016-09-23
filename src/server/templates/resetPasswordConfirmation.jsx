import React from 'react'

import Layout from 'templates/components/Layout'
import Header from 'templates/components/Header'
import Body from 'templates/components/Body'
import Button from 'templates/components/Button'

import classnames from 'classnames'

import Oy from 'oy-vey'

const { A } = Oy

import cssOut from 'templates/components/commonCss'


const renderEmail =  (title, previewText) => (username) =>
  Oy.renderTemplate(
    <Layout>
      <Header color="#134ac0" />
      <Body>
        <p>Hi <b>{username}</b>, </p>
        <p>The password for your App account was recently changed using a reset link that we sent to your email address.</p>
        <p>If you didn't make this change, please let us know.</p>
        <p>Thanks! </p>
        <p>Love,<br/>Team App</p>
      </Body>
    </Layout>
  , {
    title,
    previewText,
    headCSS: cssOut
  })

export default renderEmail(`You've successfully reset your App password`,`You've successfully reset your App password`)
