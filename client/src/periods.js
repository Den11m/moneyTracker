import moment from 'moment';

export const periods = {
    day: {
        start: moment().startOf('day').valueOf(),
        end: moment().endOf('day').valueOf()
    },
    week: {
        start: moment().startOf('week').isoWeekday(1).valueOf(),
        end: moment().startOf('week').isoWeekday(7).valueOf(),
    },
    month: {
        start: moment().startOf('month').valueOf(),
        end: moment().endOf('month').valueOf()
    }
};

export const periodMap = {
    'День': 'day',
    'Неделя': 'week',
    'Месяц': 'month'
};
