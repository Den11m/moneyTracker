import React, {Component, Fragment} from "react";
import "./App.css";
import RegistrationForm from "./components/RegistrationEnterForm/RegistrationForm";
import EnterForm from "./components/RegistrationEnterForm/EnterForm";
import Layout from "./components/Layout/Layout";
import HomePage from "./components/HomePage/HomePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import {connect} from "react-redux";
import {Switch} from "react-router-dom";

class App extends Component {
    render() {
        // console.log("app", this.props);
        const {isLogin} = this.props;
        // console.log("props", this.props);
        return (
            <Fragment>
                <Switch>
                    <PrivateRoute
                        path="/homepage"
                        redirectTo="/costs"
                        isLogin={!isLogin}
                        component={HomePage}
                    />
                    <PrivateRoute
                        path="/"
                        redirectTo="/homepage"
                        isLogin={isLogin}
                        component={Layout}
                    />
                </Switch>
                <RegistrationForm/>
                <EnterForm/>
            </Fragment>
        );
    }
}

const MSTP = state => ({
    isLogin: state.isLogin
});
export default connect(MSTP)(App);
