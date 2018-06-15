export default function budgetShow(state = false, action) {
    switch (action.type) {
        case 'ON_CLICK':
            return !state;

        default:
            return state;
    }
}
