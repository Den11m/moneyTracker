import moment from 'moment';
import {categoryMap} from '../../categories';

export const chartData = (costs, period, typeChart, categoryFromChart) => {
    const nameCategory = Object.keys(categoryMap);
    const newArrCosts = [];
    const newArrDate = [];

    const sumArrCostFromPeriod = costs.filter(obj => moment(obj.date).valueOf() >= period.start && moment(obj.date).valueOf() <= period.end);

    for (let item of nameCategory) {
        let totalSum = sumArrCostFromPeriod.filter((obj) => obj.category === item.toLowerCase()).reduce((acc, obj) => acc + obj.cost, 0);
        if (totalSum > 0) {
            newArrCosts.push({
                category: item,
                cost: totalSum,
            })
        }
    }

    for (let item of sumArrCostFromPeriod.map(obj => moment(obj.date).format('DD.MM'))) {
        let totalSum = sumArrCostFromPeriod
            .filter((obj) => categoryFromChart === 'все' ? obj : obj.category === categoryFromChart)
            .filter((obj) => moment(obj.date).format('DD.MM') === item)
            .reduce((acc, obj) => acc + obj.cost, 0);
        if (totalSum > 0 && !newArrDate.some((obj) => obj.date === item)) {
            newArrDate.push({
                date: item,
                cost: totalSum,
            })
        }
    }

    const sortArrCost = newArrCosts.sort((a, b) => b.cost - a.cost);
    const sortArrDate = newArrDate.sort((a, b) => a.date - b.date);

    if (typeChart === 'Doughnut') {
        return ({
            labels: sortArrCost.map(obj => obj.category),
            datasets: [
                {
                    // label: `Статистика расходов по категориям за период`,
                    data: sortArrCost.map(obj => obj.cost),
                    backgroundColor: [
                        '#E57373',
                        '#F06292',
                        '#BA68C8',
                        '#9575CD',
                        '#7986CB',
                        '#64B5F6',
                        '#4FC3F7',
                        '#4DD0E1',
                        '#4DB6AC',
                        '#81C784',
                        '#AED581',
                        '#DCE775',
                    ],
                    hoverBackgroundColor: [
                        '#E53935',
                        '#D81B60',
                        '#8E24AA',
                        '#5E35B1',
                        '#3949AB',
                        '#1E88E5',
                        '#039BE5',
                        '#00ACC1',
                        '#00897B',
                        '#43A047',
                        '#7CB342',
                        '#C0CA33',
                    ]
                }]
        })
    } else if (typeChart === 'Bar') {
        return ({
            labels: sortArrDate.map(obj => obj.date),
            datasets: [
                {
                    label: `Расходы за выбранный период по ${categoryFromChart === 'все' ? 'всем категориям' : `категории ${categoryFromChart}`} `,
                    backgroundColor: '#5C6BC0',
                    // borderColor: '#5C6BC0',
                    borderWidth: 1,
                    hoverBackgroundColor: '#3949AB',
                    // hoverBorderColor: '#3949AB',
                    data: sortArrDate.map(obj => obj.cost)
                }
            ]
        });
    } else if (typeChart === 'Line') {
        return ({
            labels: sortArrDate.map(obj => obj.date),
            datasets: [
                {
                    label: `Расходы за выбранный период по ${categoryFromChart === 'все' ? 'всем категориям' : `категории ${categoryFromChart}`} `,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#5C6BC0',
                    borderColor: '#5C6BC0',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'orangered',
                    pointBackgroundColor: 'orangered',
                    pointBorderWidth: 1,
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: '#5C6BC0',
                    pointHoverBorderColor: '#3949AB',
                    pointHoverBorderWidth: 1,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: sortArrDate.map(obj => obj.cost)
                }
            ]
        })
    }
};

export const options = (typeChart) => {

    if (typeChart === 'Doughnut') {
        return {
            legend: {
                position: 'right',
                labels: {
                    fontColor: '#cecece',
                    boxWidth: window.innerWidth >= 768 ? 16 : 8,
                    fontSize: window.innerWidth >= 768 ? 16 : 8,
                }
            }
        }
    }
    if (typeChart === 'Bar' || typeChart === 'Line') {
        return {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true   // minimum value will be 0.
                    }
                }]
            },
            legend: {
                labels: {
                    fontColor: '#cecece',
                    boxWidth: window.innerWidth >= 768 ? 16 : 8,
                    fontSize: window.innerWidth >= 768 ? 16 : 8,
                }
            }
        }
    }
};