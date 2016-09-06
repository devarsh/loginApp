import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { doLogout } from 'actions/login'

const Logout = (props) => {
  const { dispatch, router } = props
  dispatch(doLogout(() => {
    router.replace('/')
  }))
  return <p>Logging out..</p>
}

const mapStateToProps = (state) => state
const LogoutComponent = withRouter(connect(mapStateToProps)(Logout))

export default LogoutComponent
