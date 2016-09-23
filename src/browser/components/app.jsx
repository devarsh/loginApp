import React, { Component, PropTypes as P } from 'react'
const auth = require('utils/auth')
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { loginSuccessful, notLoggedIn } from 'actions/login'

class App extends Component {
  constructor(props) {
    super(props)
    const { dispatch } = props
    if (auth.isLoggedIn()) {
      dispatch(loginSuccessful())
    } else {
      dispatch(notLoggedIn())
    }
  }
  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  }
  updateAuth(bool) {
    if (bool) {
      loginSuccessful()
    } else {
      notLoggedIn()
    }
  }
  render() {
    const { isLoggedIn } = this.props
    return (
      <div>
        <ul>
          <li>
            {isLoggedIn ? (<Link to="/logout">LogOut</Link>) : (<Link to="/login">Login</Link>)}
          </li>
          <li><Link to="/dashboard">dashboard</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        {this.props.children || <p> You're {!isLoggedIn && 'not'} logged in </p>}
      </div>)
  }
}

App.propTypes = {
  dispatch: P.func,
  isLoggedIn: P.bool,
  children: P.object,

}

const mapStateToProps = (state) => state
const AppComponent = connect(mapStateToProps)(App)

export default AppComponent
