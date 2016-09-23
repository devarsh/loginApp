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
        <p>Thank you for signing up. Please verify your email address by clicking the following link.</p>
        <p><Button name="Verify Email" link={link} alt={true} /></p>
        <p>Thanks! </p>
        <p>Love,<br/>Team App</p>
      </Body>
    </Layout>
  , {
    title,
    previewText,
    headCSS: cssOut
  })

export default renderEmail('Verify Your App Email','Verify Your App Email')
