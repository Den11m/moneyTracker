import React from 'react';
import './Header.css';
import { logOut } from '../../actions/headerActions';
import { connect } from 'react-redux';
import BudgetRender from '../BudgetRender/BudgetRender';
import toggleShowLogin from '../../actions/toggleLoginAction';
import toggleShowRegistration from '../../actions/toggleRegistrationAction';

const Header = (props) => {
    return (
        <div className="header">
        <BudgetRender/>
            <nav className="header-nav">
                {props.isLogin
                    ? <button className="header-button" onClick={props.logout}>Log Out</button>
                    : <div><button  className="header-button" onClick={props.toggleShowRegistration}>Sign Up</button>
                        <button  className="header-button" onClick={props.toggleShowLogin}>Login</button></div>

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
        

        logout: function () {
            dispatch(logOut())
        },

        toggleShowLogin: function(){
            dispatch(toggleShowLogin())
        },

        toggleShowRegistration: function(){
            dispatch(toggleShowRegistration())
        }

    }
}


export default connect(MSTP, MDTP)(Header);