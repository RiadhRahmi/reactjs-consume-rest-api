import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import App from './App';

import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import rootReducer from './reducers/index'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}> <App/> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
