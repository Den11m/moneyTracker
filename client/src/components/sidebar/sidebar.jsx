import React, {Component} from "react";
import "./index.css";
import {connect} from "react-redux";
import {Day, Week, Month} from "../../actions/periodAction";
import {getBudgetObj} from "../../selectors/BudgetForHeaderSelector";
import {periods} from "../../periods";
import {categoryMap} from "../../categories";


// import changeCategory from "../../actions/categoryAction";
import toggleShowBudget from "../../actions/budgetShowAction";
import v4 from "uuid/v4";
import {Link} from "react-router-dom";

import budget from './icons/budget.svg';
import stopwatch from './icons/stopwatch.svg';
import bars from './icons/bars.svg';

const nameCategory = [
    "health",
    "food",
    "hygiene",
    "home",
    "clothes",
    "sport",
    "relax",
    "communication",
    "transport",
    "nursling",
    "present",
    "other",
];

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            periodVisablilty: false,
            costVisability: false,
            categories: [
                "Здоровье",
                "Еда",
                "Гигиена",
                "Жилье",
                "Одежда",
                "Спорт",
                "Отдых",
                "Связь",
                "Транспорт",
                "Питомцы",
                "Подарки",
                "Другое",
            ],
        };
    }
    currentCategory = 'all';
    currentPeriod = 'day';


    resetCategory = () => {
        this.currentCategory = 'all';
        this.props.changeCategory('all');
        fetch(`/costs?period[start]=${periods[this.currentPeriod].start}&period[end]=${periods[this.currentPeriod].end}`, {
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
                this.props.updateCosts(costs.costs)
            })
            .catch(err => {
                console.log(err)
            })
    }

    changeCategory = (categoryName, period) => {
        this.currentCategory = categoryName;
        this.props.changeCategory(categoryName);
        const url = (this.currentCategory === 'all'
            ? `/costs?period[start]=${periods[period].start}&period[end]=${periods[period].end}`
            : `/costs?period[start]=${periods[period].start}&period[end]=${periods[period].end}&category=${this.currentCategory}`)
        // console.log('URL CATEGORY!!!', url)
        fetch(url, {
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
                this.props.updateCosts(costs.costs)
            })
            .catch(err => {
                console.log(err)
            })
    }

    changePeriod = (period) => {
        this.currentPeriod = period;
        if (period === 'day') {
            this.props.day()
        };
        if (period === 'week') {
            this.props.week()
        };
        if (period === 'month') {
            this.props.month()
        };
        const url = (this.currentCategory === 'all'
            ? `/costs?period[start]=${periods[period].start}&period[end]=${periods[period].end}`
            : `/costs?period[start]=${periods[period].start}&period[end]=${periods[period].end}&category=${this.currentCategory}`)
        // console.log('URL PERIOD!!!', url)
        fetch(url, {
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
                this.props.updateCosts(costs.costs)
            })
            .catch(err => {
                console.log(err)
            })
    }

    totalCost = (categoryName) => {
        return this.props.costs.reduce((total, cost) => {
            if (cost.category !== categoryName) return total;
            return total + cost.cost;
        }, 0);
    };

    get costsSum() {
        return this.props.costs.reduce((total, cost) => total + cost.cost, 0);
    }

    // totalCostForPeriod = category => {
    //     const arrCostFromPeriod = this.props.costs.filter(
    //         obj =>
    //             obj.date >= this.props.period.start && obj.date <= this.props.period.end
    //     );
    //     if (category === "Все") {
    //         return arrCostFromPeriod.reduce((acc, obj) => acc + obj.cost, 0);
    //     } else {
    //         return arrCostFromPeriod
    //             .filter(obj => obj.category === category.toLowerCase())
    //             .reduce((acc, obj) => acc + obj.cost, 0);
    //     }
    // };

    subPeriod = () => {
        this.setState(prevState => ({
            periodVisablilty: !prevState.periodVisablilty
        }));
    };

    subCost = () => {
        this.setState(prevState => ({
            costVisability: !prevState.costVisability
        }));
    };

    // showPeriod = event => {
    // };

    render() {
        return (
            <div className="wrapper-sidebar">
                <ul>
                    <li
                        onClick={this.subPeriod}
                        className={`menu-item ${
                            this.state.periodVisablilty ? "" : "menu-item-active"
                            }`}
                    >
                        <Link className="sidebar-link" to="/costs">
                            <img className='icon-budget' src={budget} alt="icon"/>
                            Расходы
                        </Link>
                    </li>
                    <ul
                        className={`sub-menu ${
                            this.state.periodVisablilty ? "" : "active"
                            }`}
                    >
                        <li onClick={this.resetCategory}
                            key={v4()}
                            className="sub-item"
                        >
                            Все
                            <p className="sum-of-cost">{this.costsSum}</p>
                        </li>
                        {this.state.categories.map((obj, index) => {
                            let categoryName = nameCategory[index];
                            return (
                                <li
                                    onClick={this.changeCategory.bind(this, categoryName, this.currentPeriod)}
                                    key={v4()}
                                    className="sub-item"
                                >
                                    {obj}
                                    <p className="sum-of-cost">{this.totalCost(categoryName)}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <li
                        onClick={this.subCost}
                        className={`menu-item ${
                            this.state.costVisability ? "menu-item-active" : ""
                            }`}
                    >
                        <a className="sidebar-link">
                            <img className='icon-stopwatch' src={stopwatch} alt="icon"/>
                            Период
                        </a>
                    </li>
                    <ul
                        className={`sub-menu ${this.state.costVisability ? "active" : ""}`}
                    >
                        <li onClick={() => this.changePeriod('day')} className="sub-item">
                            День
                        </li>
                        <li onClick={() => this.changePeriod('week')} className="sub-item">
                            Неделя
                        </li>
                        <li onClick={() => this.changePeriod('month')} className="sub-item">
                            Месяц
                        </li>
                    </ul>

                    <li className="menu-item">
                        <Link className="sidebar-link" to="/statistics">
                           {/*{" "}*/}
                            <img className='icon-bars' src={bars} alt="icon"/>
                            Статистика
                        </Link>
                    </li>
                </ul>
                <button className="create-btn" onClick={this.props.toggleShowBudget}>
                    {!this.props.getBudgetObj ? "создать бюджет" : "редактировать бюджет"}
                </button>
            </div>
        );
    }
}

const MSTP = state => ({
    costs: state.costs,
    period: state.period,
    getBudgetObj: getBudgetObj(state),

});

function MDTP(dispatch) {
    return {
        toggleShowBudget: function () {
            dispatch(toggleShowBudget());
        },
        updateCosts(costs) {
            dispatch({
                type: 'COSTS_LOADED',
                data: costs,
            });
        },
        day: function () {
            dispatch(Day());
        },
        week: function () {
            dispatch(Week());
        },
        month: function () {
            dispatch(Month());
        },
        changeCategory(categoryName) {
            dispatch({
                type: "CHANGE_CATEGORY",
                category: categoryMap[categoryName]
            })
        }
    };
}

export default connect(
    MSTP,
    MDTP
)(Sidebar);
