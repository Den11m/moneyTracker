import React, {Component, Fragment} from 'react';
import './App.css';
import Header from './components/Header/Header';
import RegistrationForm from './components/RegistrationEnterForm/RegistrationForm'
import EnterForm from './components/RegistrationEnterForm/EnterForm';

class App extends Component {
    render() {
        return (
            <Fragment>
                <h1>test</h1>
                <Header/>
                <RegistrationForm/>
                <EnterForm/>
            </Fragment>
        );
    }
}

export default App;
