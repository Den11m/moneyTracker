import React from 'react';
import {connect} from 'react-redux';
import Modale from '../Modale/Modale';
import {addBudget} from '../../actions/budgetAction';
// import moment from 'moment';
import toggleShowBudget from '../../actions/budgetShowAction';
import {getBudgetObj} from '../../selectors/BudgetForHeaderSelector';
import './budget.css';

const Budget = (props) => {
    let budgetInput = '';
    // let dateInput = '';

    const handlePostSubmit = (e) => {

        e.preventDefault();
        if (+budgetInput.value) {
            fetch('/budget', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }),
                body: JSON.stringify({
                    value: +budgetInput.value,
                    // fact: props.getBudgetFact || 0,
                    // date: checkPeriod(dateInput.value),
                    // spendPerDay: +budgetInput.value / Math.ceil(moment.duration(checkPeriod(dateInput.value).end - checkPeriod(dateInput.value).start).asDays()),
                })
            })
                .then(response => {
                    if (response.ok || response.status === 401) {
                        return response.json();
                    }
                })
                .then(data => {
                    props.getSum(data.budget);
                    console.log('MESSAGE: Budget was post', data.budget);
                })
                .catch(err => {
                    console.log(err)
                })
            // props.getSum(e, {
            //     plan: +budgetInput.value,
            //     fact: props.getBudgetFact || 0,
            //     date: checkPeriod(dateInput.value),
            //     spendPerDay: +budgetInput.value / Math.ceil(moment.duration(checkPeriod(dateInput.value).end - checkPeriod(dateInput.value).start).asDays()),
            // })
        } else {
            alert('Бюджет должен быть положительным числом');
        }
        // +budgetInput.value > 0 ? props.getSum(e, {
        //     plan: +budgetInput.value,
        //     fact: props.getBudgetFact || 0,
        //     date: checkPeriod(dateInput.value),
        //     spendPerDay: +budgetInput.value / Math.ceil(moment.duration(checkPeriod(dateInput.value).end - checkPeriod(dateInput.value).start).asDays()),
        // }) : alert('Бюджет должен быть положительным числом');
        // props.toggleShowBudget();
    };
    //begin
    const handlePutSubmit = (e) => {

        e.preventDefault();
        if (+budgetInput.value) {
            fetch('/budget', {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }),
                body: JSON.stringify({
                    value: +budgetInput.value,
                })
            })
                .then(response => {
                    if (response.ok || response.status === 401) {
                        return response.json();
                    }
                })
                .then(data => {
                    props.changeBudget(data.budget.value);
                    console.log('MESSAGE: Budget was corrected', data.budget);
                })
                .catch(err => {
                    console.log(err)
                })
            // props.getSum(e, {
            //     plan: +budgetInput.value,
            //     fact: props.getBudgetFact || 0,
            //     date: checkPeriod(dateInput.value),
            //     spendPerDay: +budgetInput.value / Math.ceil(moment.duration(checkPeriod(dateInput.value).end - checkPeriod(dateInput.value).start).asDays()),
            // })
        } else {
            alert('Бюджет должен быть положительным числом');
        }
        // +budgetInput.value > 0 ? props.getSum(e, {
        //     plan: +budgetInput.value,
        //     fact: props.getBudgetFact || 0,
        //     date: checkPeriod(dateInput.value),
        //     spendPerDay: +budgetInput.value / Math.ceil(moment.duration(checkPeriod(dateInput.value).end - checkPeriod(dateInput.value).start).asDays()),
        // }) : alert('Бюджет должен быть положительным числом');
        // props.toggleShowBudget();
    };
    //end of second method

   const checkBudget = (e) => {
       if(props.getCurrentBudget) {
           handlePutSubmit(e);
       } else {
           handlePostSubmit(e);
       }
       props.toggleShowBudget();
   };

    // function checkPeriod(values) {
    //     switch (values) {
    //         case 'day' :
    //             return {
    //                 start: moment().startOf('day').valueOf(),
    //                 end: moment().endOf('day').valueOf(),
    //             };
    //         case 'week' :
    //             return {
    //                 start: moment().startOf('week').valueOf(),
    //                 end: moment().endOf('week').valueOf(),
    //             };
    //         case 'month' :
    //             return {
    //                 start: moment().startOf('month').valueOf(),
    //                 end: moment().endOf('month').valueOf(),
    //             };
    //         default :
    //             return {
    //                 start: moment().startOf('month').valueOf(),
    //                 end: moment().endOf('month').valueOf(),
    //             }
    //     }
    // }

    return (
        <Modale
            toggleShowWindow={props.toggleShowBudget} click={props.onClickBudget}>


            <form className='budget-form' onSubmit={checkBudget}>
                <h3 className='budget-title'>{!props.getBudgetObj ? "Создать бюджет" : "Редактировать бюджет"}</h3>
                <div className="budget-create">
                    <img className="icon_budget" src="/plus.png" alt=""/>
                    <input className='input-budget statistic__select' type="number" placeholder='Сумма'
                           ref={(input) => budgetInput = input}/>
                </div>

                <div className="budget-create">
                    <img className="icon_budget" src="/period.png" alt=""/>
                    <input className='input-budget statistic__select'
                           // ref={(input) => dateInput = input}
                           placeholder='Месяц' >
                    {/*<option value="month">Месяц</option>*/}
                    {/*<option value="week">Неделя</option>*/}
                    {/*<option value="day">День</option>*/}
                    </input>
                </div>
                <button type='submit' className='modale__btn-save'
                >СОХРАНИТЬ
                </button>
            </form>
        </Modale>
    )
};

function MDTP(dispatch) {
    return {
        getSum: function (budgetInfo) {
            dispatch(addBudget(budgetInfo))
        },

        changeBudget(budget){
            dispatch({
                type: "BUDGET_UPDATE",
                budget
            })
        },

        toggleShowBudget: function () {
            dispatch(toggleShowBudget())
        }
    }
}

function MSTP(state) {
    return {
        onClickBudget: state.budgetShow,
        getCurrentBudget: getBudgetObj(state).value,
        getBudgetFact: getBudgetObj(state).fact,
        getBudgetObj: getBudgetObj(state),
        budget: state.budget,
    }
}


export default connect(MSTP, MDTP)(Budget);
