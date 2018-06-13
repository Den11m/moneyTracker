import React, {Component, Fragment} from 'react';
import './App.css';
import AddNewCosts from './components/addNewCosts/addNewCosts';
// import Modale from './components/Modale/Modale';
//import CostList from './components/CostList/CostList';
import Main from './components/Main/Main';
import Budget from './components/Budget/Budget';

class App extends Component {
    render() {
        return (
            <Fragment>
                <h1>Test</h1>
                {/*<Budget/>*/}
                <Main/>
            </Fragment>
        );
    }
}

export default App;
