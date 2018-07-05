import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import configureStore, {history} from './store/store';
import {loadState, saveState} from './localStorage';
import {ConnectedRouter} from 'connected-react-router';

const persistedState = loadState();
const store = configureStore(persistedState);

setInterval(() => {
    store.subscribe(() => {
        saveState({
            // costs: store.getState().costs,
            budget: store.getState().budget,
            isLogin: store.getState().isLogin,
            period: store.getState().period,
            typeChart: store.getState().typeChart,
            categoryFromChart: store.getState().categoryFromChart,
            filterCategory: store.getState().filterCategory,
            click: store.getState().click,
            spent: store.getState().spent,
            budgetShow: store.getState().budgetShow,
        })
    });
}, 1000);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
