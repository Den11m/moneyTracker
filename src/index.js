import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import {loadState, saveState} from './localStorage';

const persistedState = loadState();
const store = configureStore(persistedState);

setInterval(()=>{
    store.subscribe(() => {
        saveState({
            costs: store.getState().costs,
            budget: store.getState().budget,
            isLogin: store.getState().isLogin,
            period: store.getState().period,
        })
    });
},1000);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
