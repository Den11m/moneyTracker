export default function costs(state = [], action) {
    switch (action.type) {
        case 'ADD-COSTS':
            return [...state, action.data];

        case 'DELETE-COST':
            return state.filter(cost => cost.date !== action.id);

        default:
            return state;
    }
}

