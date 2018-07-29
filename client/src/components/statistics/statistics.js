import React, {Component} from 'react';
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import {connect} from 'react-redux'
import changeType from '../../actions/typeChartActions';
import changeCategory from '../../actions/filterCategoryActions';
import {chartData, options} from './chartData';
import {categoryMap} from '../../categories';
import moment from 'moment';
import './statistics.css';


class Statistics extends Component {

    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        name === 'typeChart' && this.props.changeType(value);
        name === 'categoryFromChart' && this.props.changeCategory(value);
    };

    uniqCategory = () => {
        const uniqCategory = [];
        for (let obj of this.props.costs.filter(obj => moment(obj.date).valueOf() >= this.props.period.start && moment(obj.date).valueOf() <= this.props.period.end)) {
            !uniqCategory.includes(obj.category) && uniqCategory.push(obj.category)
        }
        return uniqCategory
    };

    render() {
        const {costs, period, typeChart, categoryFromChart} = this.props;
        return (
            <div className='statistic'>
                <div className='statistic__body'>
                    <h2 className='statistic__title'>Статистика</h2>
                    <select className='statistic__select'
                            name='typeChart'
                            value={typeChart}
                            onChange={this.handleInputChange}>
                        <option value="Doughnut">Кольцевая диаграмма</option>
                        <option value="Bar">Гистограмма</option>
                        <option value="Line">График</option>
                    </select>

                    {(typeChart === 'Bar' ||
                        typeChart === 'Line') &&
                    <select className='statistic__select'
                            name='categoryFromChart'
                            value={categoryFromChart}
                            onChange={this.handleInputChange}>
                        <option value="все">все категории</option>
                        {this.uniqCategory().map(el => <option key={el}
                                                               value={el}>{categoryMap[el]}</option>)}
                    </select>}

                    {typeChart === 'Doughnut' &&
                    <div className='chart-container'>
                        <Doughnut data={chartData(costs, period, typeChart)}
                                  options={options(typeChart)}/>
                    </div>}

                    {typeChart === 'Bar' &&
                    <div className='chart-container'>
                        <Bar data={chartData(costs, period, typeChart, categoryFromChart)}
                             options={options(typeChart)}/>
                    </div>}

                    {typeChart === 'Line' &&
                    <div className='chart-container'>
                        <Line data={chartData(costs, period, typeChart, categoryFromChart)}
                              options={options(typeChart)}/>
                    </div>}
                </div>
            </div>
        );
    }
}


const MSTP = (state) => ({
    costs: state.costs,
    period: state.period,
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

export default connect(MSTP, MDTP)(Statistics);