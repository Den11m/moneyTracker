import React, {Component} from 'react';
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import {connect} from 'react-redux'
import moment from 'moment';
import {changeType} from '../../actions/typeChartActions';
import {changeCategory} from '../../actions/filterCategoryActions';
import './statistics.css';

// import PropTypes from 'prop-types';

class Statistics extends Component {
    constructor(props){
        super(props),
        this.state = {
            costs: [
                {
                    cost: 500,
                    date: moment('2018, 6, 8'),
                    category: 'Связь',
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
                    category: 'Другое',
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
                    date: moment('2018, 6, 1'),
                    category: 'Здоровье',
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
                start: moment('2018, 6, 1').valueOf(),
                end: moment('2018, 6, 30').valueOf(),
            },
        }
    }

    // state = {
    //     costs: [
    //         {
    //             cost: 500,
    //             date: moment('2018, 6, 8'),
    //             category: 'Связь',
    //             comments: 'молоко',
    //         },
    //         {
    //             cost: 400,
    //             date: moment('2018, 6, 9'),
    //             category: 'Еда',
    //             comments: 'молоко',
    //         },
    //         {
    //             cost: 863,
    //             date: moment('2018, 6, 9'),
    //             category: 'Жилье',
    //             comments: '',
    //         },
    //         {
    //             cost: 1000,
    //             date: moment('2018, 6, 10'),
    //             category: 'Отдых',
    //             comments: '',
    //         },
    //         {
    //             cost: 3000,
    //             date: moment('2018, 6, 12'),
    //             category: 'Другое',
    //             comments: '',
    //         },
    //         {
    //             cost: 300,
    //             date: moment('2018, 6, 10'),
    //             category: 'Жилье',
    //             comments: '',
    //         },
    //         {
    //             cost: 120,
    //             date: moment('2018, 6, 11'),
    //             category: 'Питомецы',
    //             comments: '',
    //         },
    //         {
    //             cost: 75,
    //             date: moment('2018, 6, 11'),
    //             category: 'Гигиена',
    //             comments: '',
    //         },
    //         {
    //             cost: 2000,
    //             date: moment('2018, 6, 1'),
    //             category: 'Здоровье',
    //             comments: '',
    //         },
    //     ],
    //     budget: [
    //         {
    //             plan: 20000,
    //             fact: 0,
    //             date: {
    //                 start: moment('2018, 6, 1'),
    //                 end: moment('2018, 6, 30'),
    //             }
    //         },
    //
    //     ],
    //     isLogin: true,
    //     period: {
    //         start: moment('2018, 6, 1').valueOf(),
    //         end: moment('2018, 6, 30').valueOf(),
    //     },
    //     typeChart: 'Doughnut',
    //     filterCategory: 'все',
    // };

    data = (typeChart, filterCategory) => {
        const category = ['Здоровье', 'Еда', 'Гигиена', 'Жилье', 'Одежда', 'Спорт', 'Отдых', 'Связь', 'Транспорт', 'Питомцы', 'Подарки', 'Другое'];
        const newArrCosts = [];
        const newArrDate = [];

        const sumArrCostFromPeriod =
            this.state.costs.filter(obj => obj.date >= this.state.period.start && obj.date <= this.state.period.end);

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

        const sortArrCost = newArrCosts.sort((a, b) => b.cost - a.cost);
        const sortArrDate = newArrDate.sort((a, b) => a.date - b.date);

        if(typeChart === 'Doughnut') {
            return ({
                labels: sortArrCost.map(obj => obj.category),
                datasets: [
                    {
                        // label: `Статистика расходов по категориям за период`,
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
                        label: `Расходы за выбранный период по ${this.props.filterCategory === 'все' ? 'всем категориям' : `категории ${this.props.filterCategory}`} `,
                        backgroundColor: '#2d3d8e',
                        // borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: '#1e2c5c',
                        // hoverBorderColor: 'rgba(255,99,132,1)',
                        data: sortArrDate.map(obj => obj.cost)
                    }
                ]
            });
        }else if (typeChart === 'Line'){
            return({
                labels: sortArrDate.map(obj => obj.date),
                datasets: [
                    {
                        label: `Расходы за выбранный период по ${this.props.filterCategory === 'все' ? 'всем категориям' : `категории ${this.props.filterCategory}`} `,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: '#2d3d8e',
                        borderColor: '#2d3d8e',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'orangered',
                        pointBackgroundColor: 'orangered',
                        pointBorderWidth: 1,
                        pointHoverRadius: 3,
                        // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        // pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: sortArrDate.map(obj => obj.cost)
                    }
                ]
            })
        }
    };



    options =() => ({
        // legend: {
        //     position: 'right',
        // },

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
        name === 'typeChart' && this.props.changeType(value);
        name === 'filterCategory' && this.props.changeCategory(value);
    };

    uniqCategory = () => {
        const uniqCategory = [];
        for (let obj of this.state.costs){
            !uniqCategory.includes(obj.category) && uniqCategory.push(obj.category)
        }
        return uniqCategory
    };

    render() {

        return (
            <div className='statistic'>
                <div className='statistic__body'>
                    <h2 className='statistic__title'>Статистика</h2>
                    <select className='statistic__select'
                        name='typeChart'
                        value={this.props.typeChart}
                        onChange={this.handleInputChange}>
                        <option value="Doughnut">Кольцевая диаграмма</option>
                        <option value="Bar">Гистограмма</option>
                        <option value="Line">График</option>
                    </select>

                    {(this.props.typeChart === 'Bar' ||
                        this.props.typeChart === 'Line') &&
                        <select className='statistic__select'
                        name='filterCategory'
                        value={this.props.filterCategory}
                        onChange={this.handleInputChange}>
                        <option value="все">все</option>
                        {this.uniqCategory().map(el=> <option key={el}
                                                   value={el}>{el}</option>)}
                    </select>}

                    {this.props.typeChart === 'Doughnut' &&
                    <Doughnut data={this.data(this.props.typeChart)}
                              options = {{legend:{position:'right'}}}/>}

                    {this.props.typeChart === 'Bar' &&
                    <Bar data={this.data(this.props.typeChart, this.props.filterCategory)}
                         options={this.options()}/>}

                    {this.props.typeChart === 'Line' &&
                    <Line data={this.data(this.props.typeChart, this.props.filterCategory)}
                          options={this.options()}/>}
                </div>
            </div>
        );
    }
}

// Statistics.propTypes = {};

const MSTP = (state) => ({
    // costs: state.costs,
    // period: state.period,
    typeChart: state.typeChart,
    filterCategory: state.filterCategory,
});

const MDTP = (dispatch) => ({
    changeType: function (chart) {
        dispatch(changeType(chart))
    },
    changeCategory: function (category) {
        dispatch(changeCategory(category))
    },

});

export default connect(MSTP,MDTP)(Statistics);