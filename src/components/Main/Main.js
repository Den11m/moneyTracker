import React from 'react';
import './Main.css';
import CostList from '../../components/CostList/CostList';
import Budget from '../Budget/Budget';
import SideBar from '../../components/sidebar/sidebar';
import Statistics from '../../components/statistics/statistics';


const Main = (props) => {
    return (

        <div className="total-wrapper">
            <div className="sideBar">
                <SideBar/>
            </div>
            <div className="flex-wrapper">
                <CostList/>
                <Statistics/>
                <Budget/>
            </div>
        </div>

    )
};

export default Main;


