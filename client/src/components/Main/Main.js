import React from 'react';
import './Main.css';
import CostList from '../CostList/CostList';
import Budget from '../Budget/Budget';
import SideBar from '../../components/sidebar/sidebar';
import Statistics from '../../components/statistics/statistics';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

const Main = (props) => {
    return (
        <div className="total-wrapper">
            <div className={props.sidebarShow ? "sideBar sideBar-active" : "sideBar"}>
                <SideBar/>
            </div>
            <div className="flex-wrapper">
                <Switch>
                    <Route path='/costs' component={CostList}/>
                    <Route path='/statistics' component={Statistics}/>
                </Switch>
                <Budget/>
            </div>
        </div>

    )
};

function MSTP(state) {
    return {
        sidebarShow: state.sidebarShow,
    }
}

export default connect(MSTP)(Main);
