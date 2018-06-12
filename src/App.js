import React, {Component, Fragment} from 'react';
import './App.css';
import Modale from './components/Modale/Modale';
import Filter from "./components/Filter/Filter";
import Sidebar from './components/sidebar/sidebar';
class App extends Component {
    render() {
        return (
            <Fragment>
                <h1>Test</h1>
                <Sidebar />
                <Modale/>
                <Filter/>
            </Fragment>
        );
    }
}

export default App;
