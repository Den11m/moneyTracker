function findObj(state) {
  const index = state.findIndex(
    obj => obj.date.start <= Date.now() && obj.date.end >= Date.now()
  );
  return index;
}


export default function budget(state = [], action) {
  switch (action.type) {
    case "ADD_BUDGET":
      if (findObj(state) === -1) {
        return [...state, action.data];
      } 
        const newState = [...state]; // пред .состояние
        newState[findObj(state)] = action.data;
        return newState;
      
    case "LOAD_USER_BUDGET":
      return action.data;
    case "CLEAR_BUDGET":
      return [];
      case "BUDGET_UPDATE": {
          return [{...state[state.length-1], value: action.budget}];
      }

    case "FACT-ADD":
      return [{ ...state[state.length-1], fact: state[state.length-1].fact + action.data }];
    case "FACT_DELETE":
      return [{ ...state[state.length-1], fact: state[state.length-1].fact - action.data }];
      case "COST-ADD-FOR-BUDGET":
          return [{ ...state[state.length-1], costs: [...state[state.length-1].costs, action.data]}];
      case "COST-DELETE-FOR-BUDGET":
          return [{ ...state[state.length-1], costs: [...state[state.length-1].costs.filter(({_id})=> _id !== action.data)]}];
      default:
      return state;
  }
}


