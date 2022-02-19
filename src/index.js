import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import { store, persistor } from "./app/store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
