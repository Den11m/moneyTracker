export default function budgetShow (state = true, action){
    switch(action.type){
        case 'ON_CLICK':
            return !state;

        default:
            return state;
    }
}
