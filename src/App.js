import React, {Component, Fragment} from 'react';
import './App.css';
import Modale from './components/Modale/Modale';
import EnterForm from './components/RegistrationEnterForm/EnterForm';
import RegistrationForm from './components/RegistrationEnterForm/RegistrationForm'

class App extends Component {
    render() {
        return (
            <Fragment>
                <Modale/>
                <EnterForm/>
                <RegistrationForm/>
            </Fragment>
        );
    }
}

export default App;
