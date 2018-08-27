import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import history from "./history";

import { rootReducer, rootSaga } from "./Ducks";

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(history);

export default createStore(
  rootReducer,
  applyMiddleware(logger, sagaMiddleware, routerMiddleware)
);

sagaMiddleware.run(rootSaga);
