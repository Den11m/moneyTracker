import {combineReducers} from 'redux';
import test from './testReducers';
import headerReducer from './headerReducer';
import visibleLogin from './visibleLoginReducer';
import costs from './addNewCostsReducer';
import click from './clickReducer';
import visibleRegistration from './visibleRegistationReducer';
import budget from './budgetReducers';
import budgetShow from './budgetShowReduser';
import period from './periodReducer';
import spent from './reducerCategory';
import typeChart from './typeChartReducers';
import categoryFromChart from './filterCategoryReducers';
import sidebarShow from './sidebarShowReducer';


const reducers = combineReducers({
    test,
    isLogin: headerReducer,
    costs,
    click,
    visibleLogin,
    visibleRegistration,
    budgetShow,
    period,
    spent,
    budget,
    typeChart,
    categoryFromChart,
    sidebarShow,

});

export default reducers;
