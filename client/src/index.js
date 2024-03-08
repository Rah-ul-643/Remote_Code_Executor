import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Toaster } from 'react-hot-toast';
import rootReducer from './reducer/index';

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Toaster />
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);