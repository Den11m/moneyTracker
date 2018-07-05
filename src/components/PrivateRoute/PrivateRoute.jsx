import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ isLogin, component: Component, redirectTo, ...rest }) => (
  <Route {...rest} render={props => (isLogin 
     ? <Component {...props} /> 
     : <Redirect to={{
       pathname: redirectTo,
       state: {from: props.location}
      }}/>)}
  />
);

export default PrivateRoute;
