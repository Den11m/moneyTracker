import React, {Component} from 'react';
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import moment from 'moment'
import './statistics.css';

// import PropTypes from 'prop-types';

class Statistics extends Component {
    state = {
        costs: [
            {
                cost: 500,
                date: moment('2018, 6, 8'),
                category: 'Еда',
                comments: 'молоко',
            },
            {
                cost: 400,
                date: moment('2018, 6, 9'),
                category: 'Еда',
                comments: 'молоко',
            },
            {
                cost: 863,
                date: moment('2018, 6, 9'),
                category: 'Жилье',
                comments: '',
            },
            {
                cost: 1000,
                date: moment('2018, 6, 10'),
                category: 'Отдых',
                comments: '',
            },
            {
                cost: 3000,
                date: moment('2018, 6, 12'),
                category: 'Отдых',
                comments: '',
            },
            {
                cost: 300,
                date: moment('2018, 6, 10'),
                category: 'Жилье',
                comments: '',
            },
            {
                cost: 120,
                date: moment('2018, 6, 11'),
                category: 'Питомецы',
                comments: '',
            },
            {
                cost: 75,
                date: moment('2018, 6, 11'),
                category: 'Гигиена',
                comments: '',
            },
            {
                cost: 2000,
                date: moment('2018, 7, 1'),
                category: 'Питомецы',
                comments: '',
            },
        ],
        budget: [
            {
                plan: 20000,
                fact: 0,
                date: {
                    start: moment('2018, 6, 1'),
                    end: moment('2018, 6, 30'),
                }
            },

        ],
        isLogin: true,
        period: {
            start: moment('2018, 6, 1'),
            end: moment('2018, 6, 30'),
        },
        typeChart: 'Doughnut',
        filterCategory: 'все',
    };

    data = (typeChart, filterCategory) => {
        const category = ['Здоровье', 'Еда', 'Гигиена', 'Жилье', 'Одежда', 'Спорт', 'Отдых', 'Связь', 'Транспорт', 'Питомцы', 'Подарки', 'др'];
        const newArrCosts = [];
        const newArrDate = [];

        const sumArrCostFromPeriod =
            this.state.costs.filter(obj => obj.date > this.state.period.start && obj.date < this.state.period.end);

        for (let item of category) {
            let totalSum = sumArrCostFromPeriod.filter((obj) => obj.category === item).reduce((acc, obj) => acc + obj.cost, 0);
            if (totalSum > 0) {
                newArrCosts.push({
                    category: item,
                    cost: totalSum,
                })
            }
        }

        for (let item of sumArrCostFromPeriod.map(obj => obj.date.format('DD.MM'))) {
            let totalSum = sumArrCostFromPeriod.
            filter((obj) => filterCategory === 'все' ? obj : obj.category === filterCategory).
            filter((obj) => obj.date.format('DD.MM') === item)
                .reduce((acc, obj) => acc + obj.cost, 0);
            if (totalSum > 0 && !newArrDate.some((obj)=> obj.date === item )) {
                newArrDate.push({
                    date: item,
                    cost: totalSum,
                })
            }
        }
        // console.log(newArrDate);

        const sortArrCost = newArrCosts.sort((a, b) => b.cost - a.cost);
        const sortArrDate = newArrDate.sort((a, b) => a.date - b.date);

        if(typeChart === 'Doughnut') {
            return ({
                labels: sortArrCost.map(obj => obj.category),
                datasets: [
                    {
                        label: `Статистика расходов по категориям за период`,
                        data: sortArrCost.map(obj => obj.cost),
                        backgroundColor: [
                            '#2d3d8e',
                            '#3e50b4',
                            '#8183e4',
                            '#8de1fe',
                            '#c5cae9',
                        ],
                        hoverBackgroundColor: [
                            '#1e2c5c',
                            '#353f82',
                            '#5959b2',
                            '#72b2cc',
                            '#999eb7',
                        ]
                    }]
            })
        } else if (typeChart === 'Bar'){
            return ({
                labels: sortArrDate.map(obj => obj.date),
                datasets: [
                    {
                        label: 'Общие расходы по дням',
                        backgroundColor: '#2d3d8e',
                        // borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: '#1e2c5c',
                        // hoverBorderColor: 'rgba(255,99,132,1)',
                        data: sortArrDate.map(obj => obj.cost)
                    }
                ]
            });
        }
    };

    options =() => ({
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true   // minimum value will be 0.
                }
            }]
        }
    });



    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value,
        })
    };

    render() {
        const uniqCategory = [];
        const category = this.state.costs.forEach(obj => (
            !uniqCategory.includes(obj.category) && uniqCategory.push(obj.category)
        ));
        console.log(category);

        return (
            <div className='statistic'>
                <div className='statistic__body'>
                    <h2 className='statistic__title'>Статистика</h2>
                    <select
                        name='typeChart'
                        value={this.state.typeChart}
                        onChange={this.handleInputChange}>
                        <option value="Doughnut">doughnut</option>
                        <option value="Bar">bar</option>
                        <option value="Line">line</option>
                    </select>

                    {this.state.typeChart === 'Bar' &&
                        <select
                        name='filterCategory'
                        value={this.state.filterCategory}
                        onChange={this.handleInputChange}>
                        <option value="все">все</option>
                        {uniqCategory.map(el=> <option key={el}
                                                   value={el}>{el}</option>)}
                    </select>}

                    {this.state.typeChart === 'Doughnut' &&
                    <Doughnut data={this.data(this.state.typeChart)}/>}

                    {/*{this.state.typeChart === 'Bar' && <Bar data={this.data('Doughnut')}/>}*/}

                    {this.state.typeChart === 'Bar' &&
                    <Bar data={this.data(this.state.typeChart, this.state.filterCategory)}
                         options={this.options()}/>}

                    {/*{this.state.typeChart === 'Line' && <Line data={this.data(this.state.typeChart)}/>}*/}

                </div>
            </div>
        );
    }
}

// Statistics.propTypes = {};

export default Statistics;
