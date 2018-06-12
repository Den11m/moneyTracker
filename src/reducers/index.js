import {combineReducers} from 'redux';
import test from './testReducers';
import period from './periodReducer';

const reducers = combineReducers({
    test,
    period,
});


export default reducers;