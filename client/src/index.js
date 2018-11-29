import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './Reducers';
import axios from 'axios';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
window.axios = axios;
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
require('velocity-animate');
require('velocity-animate/velocity.ui');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
