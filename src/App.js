import React, {Component, Fragment} from 'react';
import './App.css';
import Header from './components/Header/Header';
import RegistrationForm from './components/RegistrationEnterForm/RegistrationForm';
import EnterForm from './components/RegistrationEnterForm/EnterForm';
import Main from './components/Main/Main';

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <RegistrationForm/>
                <EnterForm/>
                <Main/>
            </Fragment>
        );
    }
}

export default App;
