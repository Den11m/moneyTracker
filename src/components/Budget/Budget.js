import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from 'react-date-picker';
import { addBudget } from '../../actions/budgetAction';
import PropTypes from 'prop-types';

class Budget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: '',
        }
    }
    render() {
        let budgetInput = '';
        let dateInput = '';

        return (
            <div>
                <form action='' onSubmit={(e) => this.props.getSum(e, {plan: budgetInput.value, date: dateInput.value})}>
                      {/*// onSubmit={(e) => this.props.getSum(e, {plan: budgetInput.value, date: dateInput.value})}>*/}
                    {/*// Введите сумму*/}
                    <input type='' placeholder='enter summa' ref={(input) => this.budgetInput = input}/>
                    <input type='' placeholder='enter period' ref={(input) => this.dateInput = input}/>

                </form>
            </div>
        )
    }
}

function MDTP(dispatch) {
    return {
        getSum: function (e, sum) {
            e.preventDefault();
            dispatch(addBudget(sum))
        },

        getData: function (e, data) {
            e.preventDefault();
            dispatch()
        }
    }
}

export default connect(null, MDTP)(Budget);








// class HelloWorld extends React.Component {
//     render() {
//         return (
//             <h1>Привет, {this.props.name}</h1>
//         ); }}
//
// HelloWorld.propTypes = {
//     name: PropTypes.string
// };
