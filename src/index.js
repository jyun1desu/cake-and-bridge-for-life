import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './style/globalStyle'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import {
  BrowserRouter as Router,
} from "react-router-dom";

ReactDOM.render(
    <RecoilRoot>
        <App />
        <GlobalStyle />
    </RecoilRoot>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
