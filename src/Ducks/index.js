import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { reducer as formReducer } from "redux-form";

import {
  widgetName as userWidget,
  saga as userSaga,
  reducer as userReducer
} from "./user";

import {
  widgetName as authWidget,
  rootSaga as authSaga,
  rootReducer as authReducer
} from "./auth";

import {
  widgetName as musicWidget,
  rootSaga as musicSaga,
  rootReducer as musicReducer
} from "./music";

export const rootReducer = combineReducers({
  Router: routerReducer,
  form: formReducer,
  [userWidget]: userReducer,
  [authWidget]: authReducer,
  [musicWidget]: musicReducer
});

export const rootSaga = function*() {
  yield all([userSaga(), authSaga(), musicSaga()]);
};
