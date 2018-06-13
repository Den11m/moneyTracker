import moment from 'moment';

 const period = (state = {}, action) => {
    switch (action.type) {
        case 'День':
            return {
                start: moment().startOf('day').valueOf(),
                end: moment().endOf('day').valueOf(),
            };
        case 'Неделя':
            return {
                start: moment().startOf('week').add(1, 'days').valueOf(),
                end: moment().endOf('week').add(1, 'days').valueOf(),
            };
        case 'Месяц':
            return {
                start: moment().startOf('month').valueOf(),
                end: moment().endOf('month').valueOf(),
            };
        default:
            return {
                start: moment().startOf('day').valueOf(),
                end: moment().endOf('day').valueOf(),
            };
    }
};

 export default period;