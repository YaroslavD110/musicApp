import { all, takeEvery, put, call } from "redux-saga/effects";
import { appName } from "../../config";
import { Map } from "immutable";
import { auth } from "../../firebase";
import { errorToast } from "../../utils/toasts";

/* Actions */
export const widgetName = "signIn";
export const SIGN_IN_USER_REQUEST = `${appName}/${widgetName}/SIGN_IN_USER_REQUEST`;
export const SIGN_IN_USER_SUCCESS = `${appName}/${widgetName}/SIGN_IN_USER_SUCCESS`;
export const SIGN_IN_USER_FILED = `${appName}/${widgetName}/SIGN_IN_USER_FILED`;

/* Reducer */
const initialState = Map({
  isLoading: false,
  error: null
});

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN_USER_REQUEST:
      return state.set("isLoading", true);

    case SIGN_IN_USER_SUCCESS:
      return state.set("isLoading", false);

    case SIGN_IN_USER_FILED:
      return state.set("isLoading", false).set("error", payload.error);

    default:
      return state;
  }
};

/* Actions creators */
export const signInUser = user => ({
  type: SIGN_IN_USER_REQUEST,
  payload: { user }
});

/* Sagas */
export const signInSaga = function*({ payload: { user } }) {
  try {
    yield call(
      [auth, auth.signInWithEmailAndPassword],
      user.email,
      user.password
    );
    yield put({
      type: SIGN_IN_USER_SUCCESS
    });
  } catch (error) {
    yield call(errorToast, "Oh, something went wrong");
    yield put({ type: SIGN_IN_USER_FILED, payload: { error: error.message } });
  }
};

export const saga = function*() {
  yield all([takeEvery(SIGN_IN_USER_REQUEST, signInSaga)]);
};
