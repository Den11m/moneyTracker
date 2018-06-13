import React, {Component, Fragment} from 'react';
import './App.css';
import Modale from './components/Modale/Modale';
import Filter from "./components/Filter/Filter";
import Sidebar from './components/sidebar/sidebar';
import AddNewCosts from './components/addNewCosts/addNewCosts';
// import Modale from './components/Modale/Modale';
//import CostList from './components/CostList/CostList';
import Main from './components/Main/Main';
import Budget from './components/Budget/Budget';

class App extends Component {
    render() {
        return (
            <Fragment>

                <Sidebar />
                {/*<Modale/>*/}
                {/*<Filter/>*/}
            </Fragment>
        );
    }
}

export default App;
