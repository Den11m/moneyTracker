import React from 'react';
import {connect} from 'react-redux';
import {getCosts, click, period, spent} from '../../selectors/CostListSelector';
import {deleteCost, deleteFact, loadCosts} from '../../actions/addNewCostsAction';
import toggleShowWindow from '../../actions/clickAction';
import moment from 'moment';
import AddNewCosts from '../addNewCosts/addNewCosts';
import {getBudgetPlan} from '../../selectors/BudgetForHeaderSelector';
import {serverConfig} from '../../config/index';
import v4 from 'uuid/v4';
import './index.css';

const {protocol, host, port} = serverConfig;

const getPeriod = (costs, period, filterCategory = null) => {
    let filterPeriod = costs.filter(obj => obj.date >= period.start && obj.date <= period.end);
    let result = filterCategory && filterPeriod.filter(obj => obj.category === filterCategory);
    return filterCategory ? result.sort((a, b) => a.date - b.date) : filterPeriod.sort((a, b) => a.date - b.date);
};

class CostList extends React.Component {

    componentDidMount(){
       
        fetch(`${protocol}://${host}:${port}/costs`, {
            method: 'GET',
            headers: new Headers({
                // "Access-Control-Request-Headers": "Authorization",
                "Authorization": localStorage.getItem('token')
            }),
        })
        .then(response => {
            if(response.ok || response.status === 401){
                return response.json();
            } 
        })
        .then(userCosts => {
            this.props.loadUserCosts(userCosts.costs);
        })
        .catch(err => {
            console.log(err)
        })
    }

    delCost = (id, date, cost) => {
        fetch(`${protocol}://${host}:${port}/costs/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Authorization": localStorage.getItem('token')
            })
        }).then(response => {
            if(response.ok){
                this.props.deleteCost(date);
                this.props.deleteFact(cost)
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
                                onClick={() => this.props.getBudgetPlan > 0 ? this.props.toggleShowWindow() : alert('введите бюджет')}></button>
                        <p className="cost-info"> Период: {this.props.period.period.toLowerCase()} </p>
                        <p className="cost-category">Категория: {this.props.category === '' ? 'все' : this.props.category.toLowerCase()}</p>
                    </div>
                    <table className="Table">
                        <tbody>{this.props.costs.length ? getPeriod(this.props.costs, this.props.period, this.props.category).map((el, index) =>
                            <tr className="line" id={el.date} key={v4()}>
                                <td className="start">{index + 1}.</td>
                                <td>{el.category} {el.comments === '' ? '' : `(${el.comments})`}</td>
                                <td>{moment(el.date).format("DD.MM.YYYY h:mm")}</td>
                                <td>{el.cost} грн</td>
                                <td><img className="deleteCost" src="/tag-delete.svg" alt="delete" onClick={() => {this.delCost(el._id, el.date, el.cost)}}/></td>

                            </tr>) : null}
                        </tbody>
                    </table>
                    <div className="result">
                        <p className="spends-result"> Всего
                            <span
                                className="spends-span">{this.props.costs.length && getPeriod(this.props.costs, this.props.period, this.props.category).reduce((prev, curr) => prev + curr.cost, 0)}</span>
                            грн
                        </p>
                    </div>
    
                </div>
            </div>
    
        )
    
    }
};

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
        }

    }
}

export default connect(MSTP, MDTP)(CostList);






