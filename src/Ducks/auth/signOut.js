import { all, takeEvery, put } from "redux-saga/effects";
import { appName } from "../../config";
import { Map } from "immutable";
import { auth } from "../../firebase";

/* Actions */
export const widgetName = "signOut";
export const SIGN_OUT_USER_REQUEST = `${appName}/${widgetName}/SIGN_OUT_USER_REQUEST`;
export const SIGN_OUT_USER_SUCCESS = `${appName}/${widgetName}/SIGN_OUT_USER_SUCCESS`;
export const SIGN_OUT_USER_FILED = `${appName}/${widgetName}/SIGN_OUT_USER_FILED`;

/* Reducer */
const initialState = Map({
  isLoading: false,
  error: null
});

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_OUT_USER_REQUEST:
      return state.set("isLoading", true);

    case SIGN_OUT_USER_SUCCESS:
      return state.set("isLoading", false);

    case SIGN_OUT_USER_FILED:
      return state.set("isLoading", false).set("error", payload.error);

    default:
      return state;
  }
};

/* Actions creators */
export const signOutUser = user => ({
  type: SIGN_OUT_USER_REQUEST,
  payload: { user }
});

/* Sagas */
export const signOutSaga = function*({ payload: { user } }) {
  try {
    yield auth.signOut();
    yield put({
      type: SIGN_OUT_USER_SUCCESS
    });
  } catch (error) {
    yield put({ type: SIGN_OUT_USER_FILED, payload: { error: error.message } });
  }
};

export const saga = function*() {
  yield all([takeEvery(SIGN_OUT_USER_REQUEST, signOutSaga)]);
};
