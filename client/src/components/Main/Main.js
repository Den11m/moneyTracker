import React from 'react';
import './Main.css';
import CostList from '../CostList/CostList';
import Budget from '../Budget/Budget';
import SideBar from '../../components/sidebar/sidebar';
import Statistics from '../../components/statistics/statistics';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../store/store';

const Main = (props) => {
    return (
        <div className="total-wrapper">
            <div className={props.sidebarShow ? "sideBar sideBar-active" : "sideBar"}>
                <SideBar/>
            </div>
            <ConnectedRouter history={history}>
            <div className="flex-wrapper">
                <Switch>
                    <Route path='/costs' component={CostList}/>
                    <Route path='/statistics' component={Statistics}/>
                </Switch>
                <Budget/>
            </div>
            </ConnectedRouter>
        </div>

    )
};

function MSTP(state) {
    return {
        sidebarShow: state.sidebarShow,
    }
}

export default connect(MSTP)(Main);
