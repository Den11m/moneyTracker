import React, {Component, Fragment} from 'react';
import './App.css';
import CostList from './components/CostList/CostList';

class App extends Component {
    render() {
        return (
            <Fragment>
                <h1>Test</h1>
                <CostList/>
            </Fragment>
        );
    }
}

export default App;

