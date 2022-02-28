import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 9-11 support
import 'react-app-polyfill/stable';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import App from "./App";
import { createTheme } from "@material-ui/core/styles";
import './index.css';

const history = createBrowserHistory();
const theme = createTheme({
  typography: {
    fontFamily: '"noto_sans", serif'
  }
});
ReactDOM.render(
  <React.StrictMode history={history} theme={theme}>
    <App
      style={{
        fontFamily: "NanumSquare !important"
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

