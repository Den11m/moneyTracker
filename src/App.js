import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import RegistrationForm from './components/RegistrationEnterForm/RegistrationForm'
import EnterForm from './components/RegistrationEnterForm/EnterForm';
import AddNewCosts from './components/addNewCosts/addNewCosts';
// import Modale from './components/Modale/Modale';
//import CostList from './components/CostList/CostList';
import Main from './components/Main/Main';
import visibleRegistration from './reducers/visibleRegistationReducer';





class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <RegistrationForm />
                <EnterForm />
                < AddNewCosts />
                {/* <Modale/> */}
                <Main />
            </Fragment>
        );
    }
}

const MSTP = (state) => ({
    visibleRegistration: state.visibleRegistration
})

export default connect(MSTP)(App);

