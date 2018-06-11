import {combineReducers} from 'redux';
import test from './testReducers';
import {listItems} from './CostListReducer'



const reducers = combineReducers({
    test,
    listItems,
});

export default reducers;