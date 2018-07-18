import React, { Fragment } from "react";
import "./BudgetRender.css";
import { connect } from "react-redux";
import {loadBudgetArr} from '../../actions/budgetAction';
import {
  getBudgetPlan,
  getFactBudgetPerDay
} from "../../selectors/BudgetForHeaderSelector";
import toggleShowBudget from "../../actions/budgetShowAction";
import ReactTooltip from 'react-tooltip';
import {getBudgetObj} from "../../selectors/BudgetForHeaderSelector";

class BudgetRender extends React.Component {
  componentDidMount() {
    fetch("/budget", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      })
    })
      .then(response => {
        if (response.ok || response.status === 401) {
          return response.json();
        }
      })
        // весь код написан под массив с объектами
      .then(data => {

        this.props.loadButgets(data.budgets);
        // console.log("MESSAGE: Budget loaded", data.budgets);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Fragment>
        <div onClick={this.props.toggleShowBudget} className="BudgetRender">
          <img
            className="BudgetRender-img"
            src="/iconBudgetRender.png"
            alt="budget"
          />
          <span
            className={
              this.props.getFactBudgetPerDay.toFixed(0) >= 0
                ? "BudgetRender-span"
                : "BudgetRender-span budget-fatal"
            }
          >
            {this.props.getFactBudgetPerDay.toFixed(0)}
            грн
          </span>
          <span className="BudgetRender-span">
            {" "}
            / {this.props.getBudgetPlan} грн
          </span>
            <a className='tool-tip-balance' data-tip data-for="balance">
                <ReactTooltip id='balance' type='error'>
                <span className='tool-tip-span' data-tooltip>
                    Бюджет на день
                </span>
                </ReactTooltip>
            </a>
            <a className='tool-tip-wallet' data-tip data-for="budget">
                <ReactTooltip id='budget' type='error'>
                <span className='tool-tip-span-wallet' data-tooltip>
                    {!this.props.getBudgetObj ? "Создать бюджет" : "Редактировать бюджет"}
                </span>
                </ReactTooltip>
            </a>
        </div>
      </Fragment>
    );
  }
}

const MSTP = state => ({
    getBudgetPlan: getBudgetPlan(state),
    getFactBudgetPerDay: getFactBudgetPerDay(state),
    getBudgetObj: getBudgetObj(state),
});

const MDTP = dispatch => ({
    loadButgets: function(budgetArr) {
    dispatch(loadBudgetArr(budgetArr));
  },
  toggleShowBudget: function() {
    dispatch(toggleShowBudget());
  }
});

export default connect(
  MSTP,
  MDTP
)(BudgetRender);
