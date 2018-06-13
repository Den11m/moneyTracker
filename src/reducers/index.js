import {combineReducers} from 'redux';
import test from './testReducers';
import costs from './addNewCostsReducer';
import {listItems} from './CostListReducer';
import click from './clickReducer';
import budget from './budgetReducers';
import budgetShow from './budgetShowReduser';


const reducers = combineReducers({
    test,
    costs,
    click,
    budget,
    budgetShow,
})

export default reducers;
