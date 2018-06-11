import moment from 'moment';

export function listItems(state = {
    spends: [
        {
            cost: 20,
            date: moment('2018, 5, 8').format('DD.MM.YYYY'),
            category: 'Їдло',
            comments: "Комент",
            id: 1
        },
        {
            cost: 30,
            date: moment('2018, 5, 8').format('DD.MM.YYYY'),
            category: 'Гігієна',
            comments: 'Комент',
            id: 2
        },
        {
            cost: 25,
            date: moment('2018, 5, 9').format('DD.MM.YYYY'),
            category: 'Спорт',
            comments: 'Комент',
            id: 3
        }, {
            cost: 320,
            date: moment('2018, 5, 10').format('DD.MM.YYYY'),
            category: 'Квартплата',
            comments: 'Комент',
            id: 4
        },
        {
            cost: 60,
            date: moment('2018, 5, 11').format('DD.MM.YYYY'),
            category: 'Розваги',
            comments: 'Комент',
            id: 5
        }
    ]
}, action) {
    switch (action.type) {
        case 'GET_LIST':
            return state;
        default:
            return state
    }
}

