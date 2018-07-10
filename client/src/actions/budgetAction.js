export function addBudget(budgetInfo) {
    return {
        type: 'ADD_BUDGET',
        data: budgetInfo,
    }
}

export function clearBudget() {
    return {
        type: 'CLEAR_BUDGET',
    }
}
