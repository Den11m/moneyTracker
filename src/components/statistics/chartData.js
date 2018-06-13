const chartData = (costs, period, typeChart, categoryFromChart) => {
    const category = ['Здоровье', 'Еда', 'Гигиена', 'Жилье', 'Одежда', 'Спорт', 'Отдых', 'Связь', 'Транспорт', 'Питомцы', 'Подарки', 'Другое'];
    const newArrCosts = [];
    const newArrDate = [];

    const sumArrCostFromPeriod = costs.filter(obj => obj.date >= period.start && obj.date <= period.end);

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
        let totalSum = sumArrCostFromPeriod
            .filter((obj) => categoryFromChart === 'все' ? obj : obj.category === categoryFromChart)
            .filter((obj) => obj.date.format('DD.MM') === item)
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
    } else if (typeChart === 'Bar'){
        return ({
            labels: sortArrDate.map(obj => obj.date),
            datasets: [
                {
                    label: `Расходы за выбранный период по ${categoryFromChart === 'все' ? 'всем категориям' : `категории ${categoryFromChart}`} `,
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
                    label: `Расходы за выбранный период по ${categoryFromChart === 'все' ? 'всем категориям' : `категории ${categoryFromChart}`} `,
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

export default chartData;