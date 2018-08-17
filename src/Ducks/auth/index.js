import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import {
  widgetName as signInWidget,
  saga as signInSaga,
  reducer as signInReducer
} from "./signIn";

import {
  widgetName as signUpWidget,
  saga as signUpSaga,
  reducer as signUpReducer
} from "./signUp";

import {
  widgetName as signOutWidget,
  saga as signOutSaga,
  reducer as signOutReducer
} from "./signOut";

export const widgetName = "Auth";

export const rootReducer = combineReducers({
  [signInWidget]: signInReducer,
  [signUpWidget]: signUpReducer,
  [signOutWidget]: signOutReducer
});

export const rootSaga = function*() {
  yield all([signInSaga(), signUpSaga(), signOutSaga()]);
};
