import {combineReducers} from 'redux';
import test from './testReducers';
import headerReducer from './headerReducer';


const reducers = combineReducers({
    test,
    isLogin: headerReducer
});


export default reducers;