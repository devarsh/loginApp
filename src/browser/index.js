import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import Login from 'components/login'
import Dashboard from 'components/dashboard'
import App from 'components/app'
import Logout from 'components/logout'
import Reducer from 'reducers/login'
import About from 'components/about'
const auth = require('utils/auth')
import { Router, Route, browserHistory } from 'react-router'


const logger = createLogger()

const store = createStore(Reducer, compose(
  applyMiddleware(thunk, logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f))

const requireAuth = (nextState, replace) => {
  if (!auth.isLoggedIn()) {
    replace({ pathname: 'login', state: { nextPathname: nextState.location.pathname } })
  }
}
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="login" component={Login} />
        <Route path="dashboard" components={Dashboard} onEnter={requireAuth} />
        <Route path="logout" components={Logout} onEnter={requireAuth}/>
        <Route path="about" components={About} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('container')
)
