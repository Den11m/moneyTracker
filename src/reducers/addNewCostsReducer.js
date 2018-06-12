export default function costs (state = [], action){
    switch(action.type){
        case 'ADD-COSTS':
        return [...state, action.data];
    default:
     return state;
    }
}

