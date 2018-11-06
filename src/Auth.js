import React from 'react';
import { Route, Redirect } from 'react-router-dom'

export const Auth = ({ component: Component, loggedIn, ...rest }) => (
<Route {...rest} render={props => (
  loggedIn ?
  <Component {...props} />: <Redirect to='/'/>
)
}
/>
)

export const SplashRoute = ({ component: Component, loggedIn, logIn, ...rest }) => (
<Route {...rest} render={props => (
  !loggedIn ?
  <Component {...props} logIn={logIn} />: <Redirect to='/dashboard'/>
)
}
/>
)