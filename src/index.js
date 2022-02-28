import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 9-11 support
import 'react-app-polyfill/stable';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App";
//import './App.css';

const history = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
    <App
      style={{
        fontFamily: "NanumSquare !important"
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
