import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MaterialUIControllerProvider } from "./context";
import Store from "./services/store/Store";
import { BrowserRouter } from "react-router-dom";

export const store = new Store();

export const Context = createContext({
  store
});

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <Context.Provider value={{ store }}>
        <App />
      </Context.Provider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
