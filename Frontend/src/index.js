import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { reducers } from './reducers';
import App from "./App";
import { Provider } from 'react-redux';
import { ContextProvider } from "./Contexts/ContextProvider";
import { createStore, applyMiddleware, compose } from 'redux';
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

ReactDOM.render(
  
  
<BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
</BrowserRouter>,
  document.getElementById('root'),
);