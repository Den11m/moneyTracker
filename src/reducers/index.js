import {combineReducers} from 'redux';
import test from './testReducers';
import costs from './addNewCostsReducer';
import {listItems} from './CostListReducer';
import click from './clickReducer';
import budget from './budgetReducers';
import budgetShow from './budgetShowReduser';
import period from './periodReducer';
import spent from './reducerCategory';

const reducers = combineReducers({
    test,
    costs,
    click,
    budget,
    budgetShow,
    period,
    spent,
});


export default reducers;