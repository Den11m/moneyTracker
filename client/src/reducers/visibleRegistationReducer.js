export default function visibleRegistration(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_SHOW_REGISTRATION':
            return !state;
        default:
            return state;
    }
}