import {combineReducers} from 'redux';
import test from './testReducers';
import typeChart from './typeChartReducers';
import filterCategory from './filterCategoryReducers';


const reducers = combineReducers({
    test,
    typeChart,
    filterCategory,
});


export default reducers;