import React, {Component} from 'react';
import health from './icons/health.svg';
import DatePicker from 'react-date-picker';
import addCosts from '../../actions/addNewCostsAction';
import {connect} from 'react-redux';
import moment from 'moment';
import Modale from '../Modale/Modale';
import {click} from '../../selectors/CostListSelector';
import toggleShowWindow from '../../actions/clickAction';
//import CostList from '../CostList/CostList';
import './style.css';
import {v4} from 'uuid';



















class AddNewCosts extends Component {
    // test =  null;
    sumInput = '';
    commentInput = '';
    test = null;

    state = {
        date: new Date(),
        category: [],
    };

    handleChange = date => this.setState({date});

    render() {
        return (

        )
    }
}













function MSTP(state) {
    return {
        click: click(state)
    }
}

function MDTP(dispatch) {
    return {
        addCosts: function (data) {
            dispatch(addCosts(data))
        },
        toggleShowWindow: function () {
            dispatch(toggleShowWindow())
        }
    }
}

export default connect(MSTP, MDTP)(AddNewCosts)
