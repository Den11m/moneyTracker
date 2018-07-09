export default function budget(state = [], action) {
    switch (action.type) {

        case 'ADD_BUDGET':
            if (findObj(state) === -1) {
                return [...state, action.data];
            } else {
                const newState = [...state];  //пред .состояние
                newState[findObj(state)] = action.data;
                return newState;
            }

        case 'FACT-ADD':
            return [{...state[0], fact: state[0].fact + action.data}];
        case 'FACT_DELETE':
            return [{...state[0], fact: state[0].fact - action.data}]
        default:
            return state;
    }
}

function findObj(state) {
    const index = state.findIndex(obj => obj.date.start <= Date.now() && obj.date.end >= Date.now());
    return index;
}

