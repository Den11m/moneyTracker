import {combineReducers} from 'redux';
import test from './testReducers';
import costs from './addNewCostsReducer'

const reducers = combineReducers({
    test, costs
});


export default reducers;