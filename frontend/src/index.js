import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render( 
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));
