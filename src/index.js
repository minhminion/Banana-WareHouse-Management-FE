import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import store from "./common/store";
import Root from "./common/HOCS/Root";

ReactDOM.render(
  <React.StrictMode>
    <Root {...store} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
