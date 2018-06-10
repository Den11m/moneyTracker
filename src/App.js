import React, {Component, Fragment} from 'react';
import './App.css';
import Statistics from "./components/statistics/statistics";

class App extends Component {
    render() {
        return (
            <Fragment>
                <h1>Test</h1>
                <Statistics />
            </Fragment>
        );
    }
}

export default App;
