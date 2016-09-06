/* eslint-disable no-unused-vars */
import React, { Component, PropTypes as P } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { doLogin } from 'actions/login'

const Login = ({ handleChange, handleSubmit, email,
                password, isError, errorMsg, isLoginInProcess
              }) => {
  return (<form onChange={e => handleChange(e.target.name, e.target.value)} onSubmit={handleSubmit}>
    <input
      type="text"
      name="email"
      value={email}
      placeholder="email or username"
    />
    <br />
    <input
      type="password"
      name="password"
      value={password}
      placeholder="password"
    />
    <br />
    <button type="submit">Login</button>
    {isLoginInProcess ? <p> Login in progress... </p> : null}
    {isError ? <p> {errorMsg} </p> : null}
  </form>)
}

Login.propTypes = {
  handleChange: P.func,
  handleSubmit: P.func,
  username: P.string,
  email: P.string,
  password: P.string,
  isError: P.bool,
  errorMsg: P.string,
  isLoginInProcess: P.bool,
  dispatch: P.func
}


const wrapperComponent = (WrappedComponent) => {
  class HocLogin extends Component {
    constructor(props) {
      super(props)
      this.state = { email: '', password: '' }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(name, value) {
      this.setState({ [name]: value })
    }
    handleSubmit(event) {
      event.preventDefault()
      const { dispatch, location, router } = this.props
      dispatch(doLogin(this.state.email, this.state.password, (loggedIn) => {
        if (loggedIn) {
          if (location.state && location.state.nextPathname) {
            router.replace(location.state.nextPathname)
          } else {
            router.replace('/')
          }
        }
      }))
    }
    render() {
      const { isError, errorMsg, isLoginInProcess } = this.props
      return (
        <WrappedComponent
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          password={this.state.password}
          email={this.state.email}
          isError={isError}
          errorMsg={errorMsg}
          isLoginInProcess={isLoginInProcess}
        />
      )
    }
  }
  HocLogin.propTypes = {
    isError: P.bool,
    errorMsg: P.string,
    isLoginInProcess: P.bool,
    dispatch: P.func,
    location: P.any,
    router: P.any
  }
  return HocLogin
}

const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps })
const LoginComponent = withRouter(connect(mapStateToProps)(wrapperComponent(Login)))

export default LoginComponent
