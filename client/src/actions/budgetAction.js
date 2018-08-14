export function addBudget(budgetInfo) {
    return {
        type: 'ADD_BUDGET',
        data: budgetInfo,
    };
}

export function loadBudgetArr(budgetArr) {
    return {
        type: 'LOAD_USER_BUDGET',
        data: budgetArr
    };
}

export function clearBudget() {
    return {
        type: 'CLEAR_BUDGET',
    };
}

export function addCostForBudget(cost) {
    return {
        type: 'COST-ADD-FOR-BUDGET',
        data: cost
    };
}

export function deleteCostForBudget(id) {
    return {
        type: 'COST-DELETE-FOR-BUDGET',
        data: id
    };
}