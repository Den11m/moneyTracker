import moment from 'moment';

const period = (state = {
    start: moment().startOf('day').valueOf(),
    end: moment().endOf('day').valueOf(),
    period: 'День',
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
                start: moment().startOf('week').isoWeekday(1).valueOf(),
                end: moment().startOf('week').isoWeekday(7).valueOf(),
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