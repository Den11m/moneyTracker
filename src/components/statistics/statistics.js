import React, {Component} from 'react';
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import {connect} from 'react-redux'
import moment from 'moment';
import {changeType} from '../../actions/typeChartActions';
import {changeCategory} from '../../actions/filterCategoryActions';
import chartData from './chartData';
import './statistics.css';

// import PropTypes from 'prop-types';

class Statistics extends Component {
    constructor(props){
        super(props)
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
        name === 'categoryFromChart' && this.props.changeCategory(value);
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
                        name='categoryFromChart'
                        value={this.props.categoryFromChart}
                        onChange={this.handleInputChange}>
                        <option value="все">все</option>
                        {this.uniqCategory().map(el=> <option key={el}
                                                   value={el}>{el}</option>)}
                    </select>}

                    {this.props.typeChart === 'Doughnut' &&
                    <Doughnut data={chartData(this.state.costs, this.state.period, this.props.typeChart)}
                              options={{legend: {position: 'right'}}}/>}

                    {this.props.typeChart === 'Bar' &&
                    <Bar data={chartData(this.state.costs, this.state.period, this.props.typeChart, this.props.categoryFromChart)}
                         options={this.options()}/>}

                    {this.props.typeChart === 'Line' &&
                    <Line data={chartData(this.state.costs, this.state.period, this.props.typeChart, this.props.categoryFromChart)}
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
    categoryFromChart: state.categoryFromChart,
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