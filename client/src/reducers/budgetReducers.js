export default function budget(state = [], action) {
  switch (action.type) {
    case "ADD_BUDGET":
      if (findObj(state) === -1) {
        return [...state, action.data];
      } else {
        const newState = [...state]; //пред .состояние
        newState[findObj(state)] = action.data;
        return newState;
      }
    case "LOAD_USER_BUDGET":
      return action.data;
    case "CLEAR_BUDGET":
      return [];
      case "BUDGET_UPDATE": {
          return [{...state[0], value: action.budget}];
      }

    case "FACT-ADD":
      return [{ ...state[0], fact: state[0].fact + action.data }];
    case "FACT_DELETE":
      return [{ ...state[0], fact: state[0].fact - action.data }];
    default:
      return state;
  }
}

function findObj(state) {
  const index = state.findIndex(
    obj => obj.date.start <= Date.now() && obj.date.end >= Date.now()
  );
  return index;
}
