import React from 'react';
import {connect} from 'react-redux';
import Modale from '../Modale/Modale';
import {addBudget} from '../../actions/budgetAction';
import moment from 'moment';
import toggleShowBudget from '../../actions/budgetShowAction';
import {getBudgetObj} from '../../selectors/BudgetForHeaderSelector';
import './budget.css';

const Budget = (props) => {
    let budgetInput = '';
    let dateInput = '';

    function checkPeriod(values) {
        switch (values) {
            case 'day' :
                return {
                    start: moment().startOf('day').valueOf(),
                    end: moment().endOf('day').valueOf(),
                };
            case 'week' :
                return {
                    start: moment().startOf('week').valueOf(),
                    end: moment().endOf('week').valueOf(),
                };
            case 'month' :
                return {
                    start: moment().startOf('month').valueOf(),
                    end: moment().endOf('month').valueOf(),
                };
            default :
                return {
                    start: moment().startOf('month').valueOf(),
                    end: moment().endOf('month').valueOf(),
                }
        }
    }

    return (
        <Modale
            toggleShowWindow={props.toggleShowBudget} click={props.onClickBudget}>
            <h2 className='budget-title'>{!props.getBudgetObj ? "Создать бюджет" : "Редактировать бюджет"}</h2>

            <form className='budget-form' onSubmit={(e) => {
                +budgetInput.value > 0 ? props.getSum(e, {
                    plan: +budgetInput.value,
                    fact: props.getBudgetFact || 0,
                    date: checkPeriod(dateInput.value),
                    spendPerDay: +budgetInput.value / Math.ceil(moment.duration(checkPeriod(dateInput.value).end - checkPeriod(dateInput.value).start).asDays()),
                }) : alert('Бюджет должен быть положительным числом');
                props.toggleShowBudget();
            }}>

                <input className='input-budget statistic__select' type="number" placeholder='Сумма'
                       ref={(input) => budgetInput = input}/>

                <select className='budget-select statistic__select' ref={(input) => dateInput = input}>
                    <option value="month">Месяц</option>
                    {/*<option value="week">Неделя</option>*/}
                    {/*<option value="day">День</option>*/}
                </select>
                <button type='submit' className='modale__btn-save'
                >СОХРАНИТЬ
                </button>
            </form>
        </Modale>
    )
};

function MDTP(dispatch) {
    return {
        getSum: function (e, budgetInfo) {
            e.preventDefault();
            dispatch(addBudget(budgetInfo))
        },

        toggleShowBudget: function () {
            dispatch(toggleShowBudget())
        }
    }
}

function MSTP(state) {
    return {
        onClickBudget: state.budgetShow,
        getBudgetFact: getBudgetObj(state).fact,
        getBudgetObj: getBudgetObj(state),
        budget: state.budget,
    }
}


export default connect(MSTP, MDTP)(Budget);
