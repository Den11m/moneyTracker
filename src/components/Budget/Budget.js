import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modale from '../Modale/Modale';
import {addBudget} from '../../actions/budgetAction';
import PropTypes from 'prop-types';
import moment from 'moment';
import toggleShowWindow from '../../actions/clickAction';
import {click} from '../../selectors/CostListSelector';
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
                }
            case 'week' :
                return {
                    start: moment().startOf('week').add(1, 'days').valueOf(),
                    end: moment().endOf('week').add(1, 'days').valueOf(),
                }
            case 'month' :
                return {
                    start: moment().startOf('month').valueOf(),
                    end: moment().endOf('month').valueOf(),
                }
        }
    }

        return (
            <Modale
                // toggleShowWindow={props.toggleShowWindow} click={props.click}>
                toggleShowWindow={props.toggleShowBudget} click={props.onClickBudget} >
                <h2 className='budget-title'>Создать бюджет</h2>

                <form className='budget-form' action='#' onSubmit={(e)=> props.getSum(e, {plan: +budgetInput.value, fact:0, date:checkPeriod(dateInput.value)})}>

                    <input className='input-budget' type="number" placeholder='Сумма' ref={(input) => budgetInput=input} />

                    <select className='budget-select' ref={(input)=> dateInput=input}>
                        <option value="month">Месяц</option>
                        <option value="week">Неделя</option>
                        <option value="day">День</option>
                    </select>
                    <button className='modale__btn-save'
                            onClick={(e)=>{
                                props.getSum(e, {plan: +budgetInput.value, fact:0, date:checkPeriod(dateInput.value)});
                                props.toggleShowBudget()}}
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

        // toggleShowWindow: function () {
        //     dispatch(toggleShowWindow())
        // }
    }
}

function MSTP(state){
    return {
        // click: click(state),
        onClickBudget: state.budgetShow,
    }

}



export default connect(MSTP, MDTP)(Budget);
