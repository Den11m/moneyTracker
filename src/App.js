import React, {Component, Fragment} from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationEnterForm/RegistrationForm'
import EnterForm from './components/RegistrationEnterForm/EnterForm';

class App extends Component {
    render() {
        return (
            <Fragment>
                <RegistrationForm/>
                <EnterForm/>
            </Fragment>
        );
    }
}

export default App;
