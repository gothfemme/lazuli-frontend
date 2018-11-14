import React from 'react';
import { Route, Redirect } from 'react-router-dom'

export const Auth = ({ component: Component, setCurrentUser, loggedIn, searchTerm, ...rest }) => (
<Route {...rest} render={props => (
  loggedIn ?
  <Component {...props} setCurrentUser={setCurrentUser} searchTerm={searchTerm}/>: <Redirect to='/'/>
)
}
/>
)

export const SplashRoute = ({ component: Component, visibleSplash, handleVisibleSplash, loggedIn, logIn, ...rest }) => (
<Route {...rest} render={props => (
  !loggedIn ?
  <Component {...props} visibleSplash={visibleSplash} handleVisibleSplash={handleVisibleSplash} logIn={logIn} />: <Redirect to='/dashboard'/>
)
}
/>
)