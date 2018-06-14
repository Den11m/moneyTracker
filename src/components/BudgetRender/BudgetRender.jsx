import React from 'react';
import './BudgetRender.css';
import {connect} from 'react-redux';
import {getBudgetPlan, getBudgetFact} from "../../selectors/BudgetForHeaderSelector";


const BudgetRender = (props) => {
    return (
        <div className="BudgetRender">
            <img className="BudgetRender-img" src="/iconBudgetRender.png" alt="budget picture"/>
            <span
                className="BudgetRender-span">{props.getBudgetPlan}</span>
            <span
                className="BudgetRender-span">{props.getBudgetFact}</span>
        </div>
    )
};

const MSTP = (state) => ({
    getBudgetPlan: getBudgetPlan(state),
    getBudgetFact:getBudgetFact(state),
});

export default connect(MSTP)(BudgetRender);