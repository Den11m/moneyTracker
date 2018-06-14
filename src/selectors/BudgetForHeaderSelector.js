// import moment from 'moment';

export const getBudgetObj = state => {
    if(state.budget[0]) {
        return state.budget.find(el =>
            el.date.start <= Date.now()
            && el.date.end >= Date.now()
        );
    }
    else {
        return false;
    }
};

export const getBudgetPlan = state =>  getBudgetObj(state) ? getBudgetObj(state).plan :0;

export const getBudgetSpend = state =>  getBudgetObj(state) ? getBudgetObj(state).spendPerDay :0;





// export const getBudgetFact = state => {
//     if (state.budget[0]) {
//         let findBudgetFact = state.budget.find(el =>
//             el.date.start <= Date.now()
//             && el.date.end >= Date.now()
//         );
//         let DaysInMonth = Math.ceil(moment.duration(findBudgetFact.date.end - findBudgetFact.date.start).asDays()
//         );
//         return (findBudgetFact.plan / DaysInMonth).toFixed(2) + ' грн';
//     }
// };
