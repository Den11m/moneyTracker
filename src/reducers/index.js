import {combineReducers} from 'redux';
import test from './testReducers';
import costs from './addNewCostsReducer'
import {listItems} from './CostListReducer'

const reducers = combineReducers({
    test,
    listItems,
    costs
});


export default reducers;