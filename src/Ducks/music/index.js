import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import {
  widgetName as uploadWidget,
  saga as uploadSaga,
  reducer as uploadReducer
} from "./upload";

import {
  widgetName as playlistWidget,
  saga as playlistSaga,
  reducer as playlistReducer
} from "./playlist";

import {
  widgetName as songsWidget,
  saga as songsSaga,
  reducer as songsReducer
} from "./songs";

export const widgetName = "Music";

export const rootReducer = combineReducers({
  [uploadWidget]: uploadReducer,
  [playlistWidget]: playlistReducer,
  [songsWidget]: songsReducer
});

export const rootSaga = function*() {
  yield all([uploadSaga(), playlistSaga(), songsSaga()]);
};
