import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './components/Header/Header';
import RegistrationForm from './components/RegistrationEnterForm/RegistrationForm'
import EnterForm from './components/RegistrationEnterForm/EnterForm';
import AddNewCosts from './components/addNewCosts/addNewCosts';
import Main from './components/Main/Main';
import Budget from './components/Budget/Budget';

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <RegistrationForm />
                <EnterForm />
                < AddNewCosts />
                <Main />
                <Budget/>
            </Fragment>
        );
    }
}

export default App;
