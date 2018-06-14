import React from 'react';
//import {connect} from 'react-redux';
import './Main.css';
import CostList from '../../components/CostList/CostList';
import Budget from '../Budget/Budget';


const Main = (props) => {
    console.log(' look at props fool', props);
    return (

        <div className="total-wrapper">
            <CostList/>
            <Budget/>
        </div>


    )
};

export default Main;


