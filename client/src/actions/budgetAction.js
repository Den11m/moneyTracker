export function addBudget(budgetInfo) {
    return {
        type: 'ADD_BUDGET',
        data: budgetInfo,
    }
}

export function loadBudgetArr(budgetArr) {
    return {
        type: 'LOAD_USER_BUDGET',
        data: budgetArr
    }
}

export function clearBudget() {
    return {
        type: 'CLEAR_BUDGET',
    }
}
