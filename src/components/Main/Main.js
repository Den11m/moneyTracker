import React from 'react';
//import {connect} from 'react-redux';
import './Main.css';
import CostList from '../../components/CostList/CostList';
import Budget from '../Budget/Budget';
import SideBar from '../../components/sidebar/sidebar';

const Main = (props) => {
    console.log(' look at props fool', props);
    return (

        <div className="total-wrapper">

            <div className="sideBar">
            <SideBar/>
            </div>

            <div className="flex-wrapper">

                {/*remove before merge*/}

                <div className="headerRemove">

                    <div className="headerButton-container">
                    <button className="header-bag"> </button>
                    <p className="header-sum">100 грн/1500 грн</p>
                    </div>


                </div>

                <CostList/>
                <Budget/>
            </div>

        </div>

    )
};

export default Main;


