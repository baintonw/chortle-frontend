import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import reducer from './reducer'

import { Provider } from 'react-redux'

const store = createStore(reducer)

// console.log("BEFORE", store.getState())

// store.dispatch({type: "LIKE"})//SET state
// store.dispatch({type: "LIKE"})//SET state
// store.dispatch({type: "DISLIKE"})
// store.dispatch({type: "TOGGLE"})
// store.dispatch({type: "HANDLE_CHANGE", payload: "I'm a piece of captured text !"})
// store.dispatch({type: "PRINT"})

// console.log("AFTER", store.getState())
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
