import React, {Component, Fragment} from 'react';
import './App.css';
import Modale from './components/Modale/Modale';
import Filter from "./components/Filter/Filter";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Modale/>
                <Filter/>
            </Fragment>
        );
    }
}

export default App;
