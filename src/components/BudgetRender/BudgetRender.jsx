import React from 'react';
import './BudgetRender.css';
import {connect} from 'react-redux';
import {getBudgetPlan, getBudgetSpend} from "../../selectors/BudgetForHeaderSelector";
import toggleShowBudget from '../../actions/budgetShowAction';

const BudgetRender = (props) => {
    return (
        <div onClick={props.toggleShowBudget} className="BudgetRender">
            <img className="BudgetRender-img" src="/iconBudgetRender.png" alt="budget"/>
            <span
                className="BudgetRender-span">{props.getBudgetSpend.toFixed(0)} грн /
                </span> <span
                className="BudgetRender-span">{props.getBudgetPlan} грн
                </span>
        </div>
    )
};

const MSTP = (state) => ({
    getBudgetPlan: getBudgetPlan(state),
    getBudgetSpend: getBudgetSpend(state),

});

const MDTP = (dispatch) => ({
    toggleShowBudget: function () {
        dispatch(toggleShowBudget())
    }
})

export default connect(MSTP, MDTP)(BudgetRender);