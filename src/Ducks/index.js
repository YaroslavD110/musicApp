import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import {
  widgetName as signInWidget,
  saga as signInSaga,
  reducer as signInReducer
} from "./auth/signIn";

import {
  widgetName as signUpWidget,
  saga as signUpSaga,
  reducer as signUpReducer
} from "./auth/signUp";

export const rootReducer = combineReducers({
  Router: routerReducer,
  [signInWidget]: signInReducer,
  [signUpWidget]: signUpReducer
});

export const rootSaga = function*() {
  yield all([signInSaga, signUpSaga]);
};
