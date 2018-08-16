import { all, takeEvery } from "redux-saga/effects";
import { appName } from "../../config";

/* Actions */
export const widgetName = "signIn";
export const SIGN_IN_REQUEST = `${appName}/${widgetName}/SIGN_IN_REQUEST`;

/* Reducer */
const initialState = {};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

/* Actions creators */
export const signIn = () => ({
  type: SIGN_IN_REQUEST
});

/* Sagas */
export const signInSaga = function*() {};

export const saga = function*() {
  yield all([takeEvery(SIGN_IN_REQUEST, signInSaga)]);
};
