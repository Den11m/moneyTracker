import {combineReducers} from 'redux';
import test from './testReducers';
import headerReducer from './headerReducer';
import visibleLogin from './visibleLoginReducer';
import costs from './addNewCostsReducer';
import {listItems} from './CostListReducer';
import click from './clickReducer';
import visibleRegistration from './visibleRegistationReducer';


const reducers = combineReducers({
    test,
    isLogin: headerReducer,
    listItems,
    costs,
    click,
    visibleLogin,
    visibleRegistration
});


export default reducers;