/* Redux Side of the Client Side*/
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import App from "./components/App";
import reduxThunk from "redux-thunk";

//Development Only!
import axios from "axios";
window.axios = axios;

/* Create Redux Store */
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

/* From index.html: <div id="root"></div> */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
