import React, {Component, Fragment} from 'react';
import './App.css';
import EnterForm from './components/RegistrationEnterForm/EnterForm';

class App extends Component {
    render() {
        return (
            <Fragment>
                <EnterForm/>
            </Fragment>
        );
    }
}

export default App;
