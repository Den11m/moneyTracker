import React from "react";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({isLogin, component: Component, redirectTo, ...rest}) => (
    <Route {...rest} render={props => (isLogin
        ? <Component {...props} />
        : <Redirect from={props.location.pathname} to={redirectTo}/>)}
    />
);

export default PrivateRoute;
