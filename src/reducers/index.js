import {combineReducers} from 'redux';
import budget from './budgetReducers';


const reducers = combineReducers({
    budget,
});


export default reducers;
