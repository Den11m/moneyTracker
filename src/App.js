import React, {Component, Fragment} from 'react';
import Sidebar from './components/sidebar/sidebar';
import './App.css';

class App extends Component {
    render() {
        return (
            <Fragment>
                <h1>Test</h1>
                <Sidebar />
            </Fragment>
        );
    }
}

export default App;
