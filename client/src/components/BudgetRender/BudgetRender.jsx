import React, {Fragment} from 'react';
import './BudgetRender.css';
import {connect} from 'react-redux';
import {getBudgetPlan, getFactBudgetPerDay} from "../../selectors/BudgetForHeaderSelector";
import toggleShowBudget from '../../actions/budgetShowAction';

const BudgetRender = (props) => {
    return (
        <Fragment>
            <div onClick={props.toggleShowBudget} className="BudgetRender">
                <img className="BudgetRender-img" src="/iconBudgetRender.png" alt="budget"/>
                <span
                    className={props.getFactBudgetPerDay.toFixed(0) >= 0 ? 'BudgetRender-span' : 'BudgetRender-span' +
                        ' budget-fatal'}>{props.getFactBudgetPerDay.toFixed(0)}
                    грн
        </span>
                <span
                    className="BudgetRender-span"> / {props.getBudgetPlan} грн
                </span>
            </div>
        </Fragment>
    )
};

const MSTP = (state) => ({
    getBudgetPlan: getBudgetPlan(state),
    getFactBudgetPerDay: getFactBudgetPerDay(state),

});

const MDTP = (dispatch) => ({
    toggleShowBudget: function () {
        dispatch(toggleShowBudget())
    }
});

export default connect(MSTP, MDTP)(BudgetRender);