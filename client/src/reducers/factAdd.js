export default function factAdd(state = 0, action) {
    switch (action.type) {
        case 'FACT-ADD':
            return state + action.data;

        default :
            return state;
    }
}