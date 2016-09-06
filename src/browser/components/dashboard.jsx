import React from 'react'
const auth = require('utils/auth')
const Dashboard = () => {
  let token = auth.getToken()
  return (<div>
    <h1>Dashboard</h1>
    <p>You made it!</p>
    <p>{token}</p>
  </div>)
}

export default Dashboard
