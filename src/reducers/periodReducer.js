import moment from 'moment';

const period = (state = {
    start: moment().startOf('day').valueOf(),
    end: moment().endOf('day').valueOf(),
}, action) => {
    switch (action.type) {
        case 'День':
            return {
                start: moment().startOf('day').valueOf(),
                end: moment().endOf('day').valueOf(),
                period: action.type,
            };
        case 'Неделя':
            return {
                start: moment().startOf('week').add(1, 'days').valueOf(),
                end: moment().endOf('week').add(1, 'days').valueOf(),
                period: action.type,
            };
        case 'Месяц':
            return {
                start: moment().startOf('month').valueOf(),
                end: moment().endOf('month').valueOf(),
                period: action.type,
            };
        default:
            return state;
    }
};

export default period;