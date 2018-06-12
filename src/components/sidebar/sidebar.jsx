import React, {Component} from 'react';
import './index.css';
import moment from 'moment'
import {connect} from 'react-redux';
import {Day, Week, Month} from '../../actions/periodAction';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            periodVisablilty: false,
            costVisability: false,
            categories: [
                '# Здоровье',
                '# Еда',
                '# Гигиена',
                '# Жилье',
                '# Одежда',
                '# Спорт',
                '# Отдых',
                '# Связь',
                '# Транспорт',
                '# Питомцы',
                '# Подарки'
            ]
        };
    }

    // метод для меню Период
    subPeriod = () => {
        this.setState((prevState) => ({
            periodVisablilty: !prevState.periodVisablilty
        }))
    };

    // метод для меню Расходы
    subCost = () => {
        this.setState((prevState) => ({
            costVisability: !prevState.costVisability
        }))
    };

    showPeriod = (event) => {

        // console.log(event.target);
    };

    // метод для кнопки, чтобы отрисовывать окно создания бюджета
    showCreateBudgete = () => {

    };

    render() {
        return (
            <div className='wrapper-sidebar'>
                <ul>
                    <li onClick={this.subPeriod}
                        className={`menu-item ${this.state.periodVisablilty ? 'menu-item-active' : ''}`}>Расходы
                    </li>
                    <ul className={`sub-menu ${this.state.periodVisablilty ? 'active' : ''}`}>
                        {this.state.categories.map((obj) => {
                            return (
                                <li className='sub-item'>{obj} <p className='sum-of-cost'>&#036;</p></li>

                            )
                        })}
                    </ul>
                    <li onClick={this.subCost}
                        className={`menu-item ${this.state.costVisability ? 'menu-item-active' : ''}`}>Период
                    </li>
                    <ul className={`sub-menu ${this.state.costVisability ? 'active' : ''}`}>
                        <li onClick={this.props.day} className='sub-item'>День</li>
                        <li onClick={this.props.week} className='sub-item'>Неделя</li>
                        <li onClick={this.props.month} className='sub-item'>Месяц</li>
                    </ul>
                    <li className='menu-item'>Статистика</li>
                </ul>
                <button className='create-btn' onClick={this.showCreateBudgete}>создать бюджет</button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        day: function () {
            dispatch(Day())
        },
        week: function () {
            dispatch(Week())
        },
        month: function () {
            dispatch(Month())
        }
    }
}

export default connect(null, mapDispatchToProps)(Sidebar);
