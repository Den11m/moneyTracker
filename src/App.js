import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './components/Header/Header';
import RegistrationForm from './components/RegistrationEnterForm/RegistrationForm'
import EnterForm from './components/RegistrationEnterForm/EnterForm';
import Main from './components/Main/Main';
import Statistics from './components/statistics/statistics';


class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <RegistrationForm />
                <EnterForm />
                <Main />
                <Statistics/>
            </Fragment>
        );
    }
}

export default App;
