import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { BrowserRouter } from 'react-router-dom'
import './index.css';

const store = createStore(reducer)

ReactDOM.render( 
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>,
document.getElementById('root'));
