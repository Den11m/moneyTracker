import React from 'react';
//import {connect} from 'react-redux';
import './Main.css';
import CostList from '../../components/CostList/CostList';




const Main = (props) => {
    console.log(' look at props fool', props);
    return (

        <div className="total-wrapper">
                <CostList/>
        </div>

    )
};

export default Main;


