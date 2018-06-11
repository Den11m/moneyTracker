import React, {Component, Fragment} from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationEnterForm/RegistrationForm'

class App extends Component {
    render() {
        return (
            <Fragment>
                <RegistrationForm/>
            </Fragment>
        );
    }
}

export default App;
