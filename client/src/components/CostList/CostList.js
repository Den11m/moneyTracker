import React from 'react';
import {connect} from 'react-redux';
import {getCosts, click, period, spent} from '../../selectors/CostListSelector';
import {deleteCost, deleteFact, loadCosts} from '../../actions/addNewCostsAction';
import {deleteCostForBudget} from '../../actions/budgetAction';
import toggleShowWindow from '../../actions/clickAction';
import moment from 'moment';
import AddNewCosts from '../addNewCosts/addNewCosts';
import {getBudgetPlan} from '../../selectors/BudgetForHeaderSelector';
import {periods, periodMap} from '../../periods';
import {categoryMap} from '../../categories';
import v4 from 'uuid/v4';
import './index.css';
import ReactTooltip from 'react-tooltip';

// const getPeriod = (costs, period, filterCategory = null) => {
//     let filterPeriod = costs.filter(obj => obj.date >= period.start && obj.date <= period.end);
//     let result = filterCategory && filterPeriod.filter(obj => obj.category === filterCategory);
//     return filterCategory ? result.sort((a, b) => a.date - b.date) : filterPeriod.sort((a, b) => a.date - b.date);
// };

class CostList extends React.Component {
    get costsSum() {
        return this.props.costs.reduce((total, cost) => total + cost.cost, 0);
    }

    componentDidMount() {
        this.updateLoadCost(periodMap[this.props.period.period])
    }

 updateLoadCost = (period) => (
     fetch(`/costs?period[start]=${periods[period].start}&period[end]=${periods[period].end}`, {
         method: 'GET',
         headers: new Headers({
             "Authorization": localStorage.getItem('token')
         }),
     })
         .then(response => {
             if (response.ok || response.status === 401) {
                 return response.json();
             }
         })
         .then(costs => {
             this.props.loadUserCosts(costs.costs);
         })
         .catch(err => {
             console.log(err)
         })
 );

    delCost = (id, cost) => {
        fetch(`/costs/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Authorization": localStorage.getItem('token')
            })
        }).then(response => {
            if (response.ok) {
                this.props.deleteCost(id);
                this.props.deleteFact(cost);
                this.props.deleteCostForBudget(id);
            } else {
                throw new Error()
            }
        })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        return (
            <div className="cost-wrapper">
                <AddNewCosts/>
                <div className="cost-list">
                    <div className="cost-form">
                        <button className="cost-add"
                                onClick={() => this.props.getBudgetPlan > 0 ? this.props.toggleShowWindow() : alert('введите бюджет')}>
                            <a className='tool-tip-add' data-tip data-for="add">
                                <ReactTooltip id='add' type='error'>
                                    <span className='tool-tip-span-wallet' data-tooltip>Добавить расходы</span>
                                </ReactTooltip>
                            </a>
                        </button>
                        <p className="cost-info"> Период: {this.props.period.period.toLowerCase()} </p>
                        <p className="cost-category">
                            Категория: {this.props.category === '' ? 'все' : this.props.category.toLowerCase()}</p>
                    </div>
                    <table className="Table">
                        <tbody>{this.props.costs.length ? this.props.costs.sort((a,b)=> moment(b.date).valueOf() - moment(a.date).valueOf()).map((el, index) =>
                            <tr className="line" id={el.date} key={v4()}>
                                <td className="start">{index + 1}.</td>
                                <td>{categoryMap[el.category]} {el.comments === '' ? '' : `(${el.comments})`}</td>
                                <td>{moment(el.date).format("DD.MM.YYYY h:mm")}</td>
                                <td>{el.cost} грн</td>
                                <td className="td-delete">
                                    <img className="deleteCost"
                                         src="/tag-delete.svg"
                                         alt="delete"
                                         // title="Удалить"
                                         onClick={() => {
                                             this.delCost(el._id, el.cost)
                                         }}/>
                                </td>

                            </tr>) : null}
                        </tbody>
                    </table>
                    <div className="result">
                        <p className="spends-result"> Всего
                            <span
                                className="spends-span">{this.costsSum}</span>
                            грн
                        </p>
                    </div>

                </div>
            </div>

        )

    }
}

function MSTP(state) {
    return {
        costs: getCosts(state),
        click: click(state),
        period: period(state),
        category: spent(state),
        getBudgetPlan: getBudgetPlan(state)
    }
}

function MDTP(dispatch) {
    return {
        deleteCost: function (id) {
            dispatch(deleteCost(id))
        },
        toggleShowWindow: function () {
            dispatch(toggleShowWindow())
        },
        deleteFact: function (data) {
            dispatch(deleteFact(data))
        },
        loadUserCosts: function (data) {
            dispatch(loadCosts(data))
        },
        deleteCostForBudget: function (id) {
            dispatch(deleteCostForBudget(id))
        }

    }
}

export default connect(MSTP, MDTP)(CostList);






