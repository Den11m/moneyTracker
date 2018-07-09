export default function costs(state = [], action) {
    switch (action.type) {
        case 'COSTS_LOADED': 
            return action.data;
        case 'ADD-COSTS':
            return [...state, action.data];

        case 'DELETE-COST':
            return state.filter(cost => cost.date !== action.id);

        default:
            return state;
    }
}

