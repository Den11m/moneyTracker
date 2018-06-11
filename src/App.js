import React, {Component, Fragment} from 'react';
import './App.css';
import AddNewCosts from './components/addNewCosts/addNewCosts';

class App extends Component {
    render() {
        return (
            <Fragment>
                <h1>Test</h1>
                < AddNewCosts />
            </Fragment>
        );
    }
}

export default App;
