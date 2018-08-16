import { all, takeEvery } from "redux-saga/effects";
import { appName } from "../../config";

/* Actions */
export const widgetName = "signUp";
export const SIGN_UP_REQUEST = `${appName}/${widgetName}/SIGN_UP_REQUEST`;

/* Reducer */
const initialState = {};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

/* Actions creators */
export const signUp = () => ({
  type: SIGN_UP_REQUEST
});

/* Sagas */
export const signUpSaga = function*() {};

export const saga = function*() {
  yield all([takeEvery(SIGN_UP_REQUEST, signUpSaga)]);
};
