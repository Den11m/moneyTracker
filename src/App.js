import React, {Component, Fragment} from 'react';
import './App.css';
import AddNewCosts from './components/addNewCosts/addNewCosts';
// import Modale from './components/Modale/Modale';

class App extends Component {
    render() {
        return (
            <Fragment>
                <h1>Test</h1>
                < AddNewCosts />
                {/* <Modale/> */}
            </Fragment>
        );
    }
}

export default App;
