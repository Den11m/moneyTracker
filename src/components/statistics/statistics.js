import React, {Component} from 'react';
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import './statistics.css';

// import PropTypes from 'prop-types';

class Statistics extends Component {
    state = {
        costs: [
            {
                cost: 500,
                date: new Date(2018, 5, 9),
                category: 'Еда',
                comments: 'молоко',
            },
            {
                cost: 863,
                date: new Date(2018, 5, 9),
                category: 'Жилье',
                comments: '',
            },
            {
                cost: 1000,
                date: new Date(2018, 5, 10),
                category: 'Отдых',
                comments: '',
            },
            {
                cost: 300,
                date: new Date(2018, 5, 9),
                category: 'Жилье',
                comments: '',
            },
            {
                cost: 120,
                date: new Date(2018, 5, 10),
                category: 'Питомец',
                comments: '',
            },
            {
                cost: 75,
                date: new Date(2018, 5, 11),
                category: 'Гигиена',
                comments: '',
            },
            {
                cost: 2000,
                date: new Date(2018, 6, 11),
                category: 'Питомец',
                comments: '',
            },
        ],
        budget: [
            {
                plan: 20000,
                fact: 0,
                date: {
                    start: new Date(2018, 5, 1),
                    end: new Date(2018, 5, 30),
                }
            },

        ],
        isLogin: true,
        period: new Date(2018, 5, 1),
    };

    data = () => {
        const sumArrCostFromPeriod = [
            ...this.state.costs
                .filter(obj => obj.date.getMonth() === this.state.period.getMonth())
               
        ];
        console.log(sumArrCostFromPeriod);


        const sortArrCost = [...this.state.costs.sort((a, b) => b.cost - a.cost)];

        return ({
            labels: [
                ...sortArrCost.map(obj => obj.category)
            ],
            datasets: [
                {
                    label: `Статистика расходов по категориям за период`,
                    data: [
                        ...sortArrCost.map(obj => obj.cost)
                    ],
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
        });
    };

    render() {
        // const {data} = this.state;
        return (
            <div className='statistic'>
                <div className='statistic__body'>
                    <h2 className='statistic__title'>Статистика</h2>
                    <Doughnut data={this.data}/>
                    {/*<Bar data={this.data}/>*/}
                </div>
            </div>
        );
    }
}

// Statistics.propTypes = {};

export default Statistics;
