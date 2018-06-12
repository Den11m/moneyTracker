import React, { Component } from 'react';
import './index.css';

class Sidebar extends Component {

    state = {
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

    // метод для кнопки, чтобы отрисовывать окно создания бюджета
    showCreateBudgete = () => {

    };

    render() {
        return (
            <div className='wrapper-sidebar'>
                <ul>
                    <li onClick={this.subPeriod} className={`menu-item ${this.state.periodVisablilty ? 'menu-item-active' : ''}`}>Расходы</li>
                        <ul className={`sub-menu ${this.state.periodVisablilty ? 'active' : ''}`}>
                            {this.state.categories.map((obj) => {
                                return (
                                    <li className='sub-item'>{obj} <p className='sum-of-cost'>&#036;</p></li>

                                )
                            })}
                        </ul>
                    <li onClick={this.subCost} className={`menu-item ${this.state.costVisability ? 'menu-item-active' : ''}`}>Период</li>
                        <ul className={`sub-menu ${this.state.costVisability ? 'active' : ''}`}>
                            <li className='sub-item'>День</li>
                            <li className='sub-item'>Неделя</li>
                            <li className='sub-item'>Месяц</li>
                        </ul>
                    <li className='menu-item'>Статистика</li>
                </ul>
                <button className='create-btn' onClick={this.showCreateBudgete}>создать бюджет</button>
            </div>
        )
    }
}


export default Sidebar;
