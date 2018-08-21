import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DragDropContextProvider } from "react-dnd";
import HTMLBackend from "react-dnd-html5-backend";
import { ConnectedRouter } from "react-router-redux";

import history from "./history";
import store from "./store";

import Root from "./Components/Root";

ReactDOM.render(
  <Provider store={store}>
    <DragDropContextProvider backend={HTMLBackend}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </DragDropContextProvider>
  </Provider>,
  document.getElementById("root")
);
