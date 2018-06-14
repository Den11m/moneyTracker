import React from 'react';
import {connect} from 'react-redux';
import {getCosts, click, period, spent} from '../../selectors/CostListSelector';
import getList from '../../actions/CostListAction';
import toggleShowWindow from '../../actions/clickAction';
import moment from 'moment';
import AddNewCosts from '../addNewCosts/addNewCosts';
import './index.css';
import v4 from 'uuid/v4';

const getPeriod = (costs, period, filterCategory = null) => {
    let filterPeriod = costs.filter(obj => obj.date >= period.start && obj.date <= period.end);
    let result = filterCategory && filterPeriod.filter(obj => obj.category === filterCategory);
    return filterCategory ? result.sort((a, b) => a.date - b.date) : filterPeriod.sort((a, b) => a.date - b.date);
};

const CostList = (props) => {
    return (
        <div className="cost-wrapper">
            <AddNewCosts/>
            <div className="cost-list">
                <div className="cost-form">
                    <button className="cost-add" onClick={props.toggleShowWindow}> </button>
                    <p className="cost-info"> Период: {props.period.period.toLowerCase()} </p>
                    <p className="cost-category">Категория: {props.category === '' ? 'все' : props.category.toLowerCase()}</p>
                </div>
                <table className="Table">
                    <tbody>{props.costs.length ? getPeriod(props.costs, props.period, props.category).map((el, index) => <tr className="line" key={v4()}>
                        <td className="start">{index + 1}.</td>
                        <td>{el.category} {el.comments === '' ? '' : `(${el.comments})`}</td>
                        <td>{moment(el.date).format("DD.MM.YYYY")}</td>
                        <td>{el.cost} грн</td>
                    </tr>) : null}
                    </tbody>
                </table>
                <div className="result">
                    <p className="spends-result"> Всего
                        <span
                            className="spends-span">{props.costs.length && getPeriod(props.costs, props.period, props.category).reduce((prev, curr) => prev + curr.cost, 0)}</span>
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
        category: spent(state)
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






