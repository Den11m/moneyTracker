import moment from 'moment';

export const getBudgetObj = state => {
    if (state.budget[state.budget.length - 1]) {
        return state.budget.find(el =>
            el.date.start <= Date.now()
            && el.date.end >= Date.now()
        );
    }
    else {
        return false;
    }
};

export const sumCostPerDay = state => state.costs
    .filter(obj => obj.date >= moment().startOf('day').valueOf() && obj.date <= moment().endOf('day').valueOf())
    .reduce((acc, obj) => acc + obj.cost, 0);

export const getBudgetPlan = state => getBudgetObj(state).plan > 0 ? getBudgetObj(state).plan : 0;

export const getBudgetSpend = state => getBudgetObj(state).plan > 0 ? (getBudgetObj(state).plan - getBudgetObj(state).fact + sumCostPerDay(state)) / Math.ceil(moment.duration(moment().endOf('month').valueOf() - moment().startOf('day').valueOf()).asDays()) : 0;

export const getFactBudgetPerDay = state => getBudgetSpend(state) - sumCostPerDay(state);
