import React from 'react';
//import {connect} from 'react-redux';
import './Main.css';
import CostList from '../../components/CostList/CostList';





const Main = (props) => {
    console.log(' look at props fool', props);
    return (

        <div className="total-wrapper">

            {/*remove before merge*/}
            <div className="sideBar">

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

            </div>

        </div>

    )
};

export default Main;


