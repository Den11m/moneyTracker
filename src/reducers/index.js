import {combineReducers} from 'redux';
import test from './testReducers';
import costs from './addNewCostsReducer';
import {listItems} from './CostListReducer';
import click from './clickReducer';

const reducers = combineReducers({
    test,
    listItems,
    costs,
    click
});


export default reducers;