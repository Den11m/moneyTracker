export default function filterCategory(state = 'все', action) {
    switch (action.type){
        case 'CHANGE-CATEGORY':
            return action.category;

        default:
            return state;
    }
}