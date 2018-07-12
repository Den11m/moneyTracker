import React, {Component} from "react";
import "./index.css";
import {connect} from "react-redux";
import {Day, Week, Month} from "../../actions/periodAction";
import {getBudgetObj} from "../../selectors/BudgetForHeaderSelector";


import {changeCategory} from "../../actions/categoryAction";
import toggleShowBudget from "../../actions/budgetShowAction";
import v4 from "uuid/v4";
import {Link} from "react-router-dom";

const nameCategory = [
    "all",
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
                "Все",
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
            ]
        };
    }

    totalCost = (categoryName) => {
        return this.props.costs.reduce((total, cost) => {
            if(cost.category !== categoryName) return total;
            return total + cost.cost;
        }, 0);
    }
 
    totalCostForPeriod = category => {
        const arrCostFromPeriod = this.props.costs.filter(
            obj =>
                obj.date >= this.props.period.start && obj.date <= this.props.period.end
        );
        if (category === "Все") {
            return arrCostFromPeriod.reduce((acc, obj) => acc + obj.cost, 0);
        } else {
            return arrCostFromPeriod
                .filter(obj => obj.category === category.toLowerCase())
                .reduce((acc, obj) => acc + obj.cost, 0);
        }
    };

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

    showPeriod = event => {
    };

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
                            Расходы
                        </Link>
                    </li>
                    <ul
                        className={`sub-menu ${
                            this.state.periodVisablilty ? "" : "active"
                            }`}
                    >
                        {this.state.categories.map((obj, index) => {
                            let categoryName = nameCategory[index];
                            return (
                                <li
                                    onClick={this.props.changeCategory(categoryName)}
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
                        <a className="sidebar-link"> Период </a>
                    </li>
                    <ul
                        className={`sub-menu ${this.state.costVisability ? "active" : ""}`}
                    >
                        <li onClick={this.props.day} className="sub-item">
                            День
                        </li>
                        <li onClick={this.props.week} className="sub-item">
                            Неделя
                        </li>
                        <li onClick={this.props.month} className="sub-item">
                            Месяц
                        </li>
                    </ul>

                    <li className="menu-item">
                        <Link className="sidebar-link" to="/statistics">
                            {" "}
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
        day: function () {
            dispatch(Day());
        },
        week: function () {
            dispatch(Week());
        },
        month: function () {
            dispatch(Month());
        },
        changeCategory
    };
}

export default connect(
    MSTP,
    MDTP
)(Sidebar);
