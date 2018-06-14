import React from 'react';
import {connect} from 'react-redux';
import Modale from '../Modale/Modale';
import {addBudget} from '../../actions/budgetAction';
import moment from 'moment';
import toggleShowBudget from '../../actions/budgetShowAction';
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
            <h2 className='budget-title'>Создать бюджет</h2>

            <form className='budget-form' action='#' onSubmit={(e) => props.getSum(e, {
                plan: +budgetInput.value,
                fact: 0,
                date: checkPeriod(dateInput.value),
                spendPerDay: +budgetInput.value / Math.ceil(moment.duration(checkPeriod(dateInput.value).end - checkPeriod(dateInput.value).start).asDays()),
            })}>

                <input className='input-budget statistic__select' type="number" placeholder='Сумма' ref={(input) => budgetInput = input}/>

                <select className='budget-select statistic__select' ref={(input) => dateInput = input}>
                    <option value="month">Месяц</option>
                    <option value="week">Неделя</option>
                    <option value="day">День</option>
                </select>
                <button className='modale__btn-save'
                        onClick={(e) => {
                            props.getSum(e, {
                                plan: +budgetInput.value,
                                fact: 0,
                                date: checkPeriod(dateInput.value),
                                spendPerDay: +budgetInput.value / Math.ceil(moment.duration(checkPeriod(dateInput.value).end - checkPeriod(dateInput.value).start).asDays()),
                            });
                            props.toggleShowBudget();}}
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
        },
    }
}

function MSTP(state) {
    return {
        onClickBudget: state.budgetShow,
    }
}


export default connect(MSTP, MDTP)(Budget);
