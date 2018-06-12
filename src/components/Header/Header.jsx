import React, { Fragment } from 'react';
import './Header.css';
import { loginHeader, logOut } from '../../actions/headerActions';
import { connect } from 'react-redux';
import BudgetRender from '../BudgetRender/BudgetRender';


const Header = (props) => {
    return (
        <div className="header">
        <BudgetRender/>
            <nav className="header-nav">
                {props.isLogin
                    ? <a href="#" className="header-button" onClick={props.logout}>Log Out</a>
                    : <div><a href="#" className="header-button">Sign Up</a>
                        <a href="#" className="header-button" onClick={props.login}>Login</a></div>

                }


            </nav>
            
            
        </div>
    )
}

const MSTP = (state) => {
    return {
        isLogin: state.isLogin
    }
}

const MDTP = (dispatch) => {
    return {
        login: function () {
            dispatch(loginHeader())
        },

        logout: function () {
            dispatch(logOut())
        }

    }
}


export default connect(MSTP, MDTP)(Header);