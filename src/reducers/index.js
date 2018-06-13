import {combineReducers} from 'redux';
import test from './testReducers';
import typeChart from './typeChartReducers';
import categoryFromChart from './filterCategoryReducers';


const reducers = combineReducers({
    test,
    typeChart,
    categoryFromChart,
});

export default reducers;