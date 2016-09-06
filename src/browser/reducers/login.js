/* eslint-disable no-unused-vars */
import { LOGIN_REQ, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGIN_TIMEOUT, NOT_LOGGED_IN } from 'const/const.js'


const InitialState = {
  isLoggedIn: false,
  isError: false,
  errorMsg: '',
  isLoginInProcess: false,

}

const LoginReducer = (state = InitialState, action) => {
  switch (action.type) {
    case LOGIN_REQ: {
      return { ...state, isLoginInProcess: true }
    }
    case LOGIN_SUCCESS: {
      return { ...state, isLoggedIn: true, isLoginInProcess: false, isError: false, errorMsg: '' }
    }
    case LOGIN_FAILURE: {
      return { ...state, isError: true,
        errorMsg: action.errorMsg, isLoginInProcess: false, isLoggedIn: false }
    }
    case NOT_LOGGED_IN: {
      return { ...state, isLoggedIn: false }
    }
    default: {
      return state
    }
  }
}

export default LoginReducer
