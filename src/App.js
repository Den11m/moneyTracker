import React, {Component, Fragment} from 'react';
import './App.css';
import Header from './components/Header/Header';
import RegistrationForm from './components/RegistrationEnterForm/RegistrationForm'

class App extends Component {
    render() {
        return (
            <Fragment>
                <h1>test</h1>
                <Header/>
                <RegistrationForm/>
            </Fragment>
        );
    }
}

export default App;
