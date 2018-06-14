import moment from 'moment';

export const getBudgetPlan = state => {
    let findBudgetPlan = state.budget.find(el =>
        el.date.start <= Date.now()
        && el.date.end >= Date.now()
    );
    return findBudgetPlan ? findBudgetPlan.plan + 'грн /' : '0.00 грн /'
};


export const getBudgetFact = state => {
    if (state.budget[0]) {
        let findBudgetFact = state.budget.find(el =>
            el.date.start <= Date.now()
            && el.date.end >= Date.now()
        );
        let DaysInMonth = Math.ceil(moment.duration(findBudgetFact.date.end - findBudgetFact.date.start).asDays()
        );
        console.log(DaysInMonth);
        return findBudgetFact.plan / DaysInMonth + 'грн';
    }
};