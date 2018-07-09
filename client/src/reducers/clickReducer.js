export default function click(state = false, action) {
    switch (action.type) {
        case 'CLICK':
            return !state;
        default:
            return state;
    }
}