export default function budget (state = [], action) {
    switch (action.type){
        case 'ADD_BUDGET':
            return [...state, action.data];

        default:
            return state;
    }
}

