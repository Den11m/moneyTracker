import React, {Component, Fragment} from 'react';
import './App.css';
import AddNewCosts from './components/addNewCosts/addNewCosts';
// import Modale from './components/Modale/Modale';
//import CostList from './components/CostList/CostList';
import Main from './components/Main/Main';





class App extends Component {
    render() {
        return (
            <Fragment>
                <h1>Test</h1>
                < AddNewCosts />
                {/* <Modale/> */}
                <Main/>
            </Fragment>
        );
    }
}

export default App;

