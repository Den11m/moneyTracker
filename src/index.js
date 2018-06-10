import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import {Provider} from 'react-redux';
import store from './store/store';
import CostList from './components/CostList/CostList';


ReactDOM.render(
    <Provider store={store}>
        <CostList/>
    </Provider>
    , document.getElementById('root'));




// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//
//     </Provider>
//     , document.getElementById('root'));

