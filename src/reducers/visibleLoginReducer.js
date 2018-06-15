export default function visibleLogin(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_SHOW_LOGIN':
            return !state;
        default:
            return state;
    }
}