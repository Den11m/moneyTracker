import React from 'react';
import './Header.css';
import {logOut} from '../../actions/headerActions';
import {connect} from 'react-redux';
import BudgetRender from '../BudgetRender/BudgetRender';
import toggleShowLogin from '../../actions/toggleLoginAction';
import toggleShowRegistration from '../../actions/toggleRegistrationAction';
import {getBudgetObj, getBudgetPlan} from "../../selectors/BudgetForHeaderSelector";

const Header = (props) => {
    let styleBar = (props.getBudgetObj / props.getBudgetPlan * 100) + '%';
    return (
        <div className="header">
            <div className="header-relative-box" style= {{width: 100 + '%'}}>
                <div className="progress-bar-fact" style={{width: `${styleBar}`}}>
                </div>
            </div>
            <div className='header-index-3'>
                <BudgetRender/>
                <nav className="header-nav">
                    {props.isLogin
                        ? <button className="header-button" onClick={props.logout}>Log Out</button>
                        : <div>
                            <button className="header-button" onClick={props.toggleShowRegistration}>Sign Up</button>
                            <button className="header-button" onClick={props.toggleShowLogin}>Login</button>
                        </div>
                    }
                </nav>
            </div>
        </div>
    )
};

const MSTP = (state) => {
    return {
        isLogin: state.isLogin,
        getBudgetPlan: getBudgetPlan(state),
        getBudgetObj: getBudgetObj(state).fact
    }
};

const MDTP = (dispatch) => {
    return {
        logout: function () {
            localStorage.removeItem('token');
            dispatch(logOut());
        },

        toggleShowLogin: function () {
            dispatch(toggleShowLogin())
        },

        toggleShowRegistration: function () {
            dispatch(toggleShowRegistration())
        }
    }
};

export default connect(MSTP, MDTP)(Header);
