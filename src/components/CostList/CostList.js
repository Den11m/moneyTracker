import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCosts, click, period} from '../../selectors/CostListSelector';
import getList from '../../actions/CostListAction';
import toggleShowWindow from '../../actions/clickAction';
import moment from 'moment';
//import Modale from '../../components/Modale/Modale';
import AddNewCosts from '../addNewCosts/addNewCosts';
import './index.css';


const getPeriod = (costs, period, filterCategory = null) => {
    let filterPeriod = costs.filter(obj => obj.date >= period.start && obj.date <= period.end);
    let result = filterCategory && filterPeriod.filter(obj => obj.category === filterCategory)
    return filterCategory ? result : filterPeriod;
};

const CostList = (props) => {
    console.log('props ar Cost-List component', props);

    return (
        <div className="cost-wrapper">
            <AddNewCosts/>
            <div className="cost-list">
                <div className="cost-form">
                    <button className="cost-add" onClick={props.toggleShowWindow}> </button>
                </div>
                <table className="Table">
                    <tbody>
                    {getPeriod(props.costs, {start: moment('2018, 6, 12').valueOf(), end: moment('2018, 6, 14').valueOf()
                    },'еда').map((el, index) => <tr className="line" key={el.id}>
                        <td className="start">{index + 1}.</td>
                        <td>{el.category} ({el.comments})</td>
                        <td>{moment(el.date).format("DD.MM.YYYY")}</td>
                        <td>{el.cost} грн</td>
                    </tr>)}

                    </tbody>
                </table>

                <div className="result">
                    <p className="spends-result"> Всего
                        <span
                            className="spends-span">{getPeriod(props.costs, {start: moment('2018, 6, 12').valueOf(), end: moment('2018, 6, 14').valueOf()
                        },'еда').reduce((prev, curr) => prev + curr.cost, 0)}</span>
                        грн
                    </p>
                </div>

            </div>
        </div>

    )
};

function MSTP(state) {
    return {
        costs: getCosts(state),
        click: click(state),
        period: period(state),
    }
}

function MDTP(dispatch) {
    return {
        getList: function (data) {
            dispatch(getList(data))
        },
        toggleShowWindow: function () {
            dispatch(toggleShowWindow())
        },
    }
}

export default connect(MSTP, MDTP)(CostList);






