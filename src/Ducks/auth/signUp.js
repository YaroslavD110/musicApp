import { all, takeEvery, put } from "redux-saga/effects";
import { appName } from "../../config";
import { Map } from "immutable";
import { auth } from "../../firebase";

/* Actions */
export const widgetName = "signUp";
export const SIGN_UP_USER_REQUEST = `${appName}/${widgetName}/SIGN_UP_USER_REQUEST`;
export const SIGN_UP_USER_SUCCESS = `${appName}/${widgetName}/SIGN_UP_USER_SUCCESS`;
export const SIGN_UP_USER_FILED = `${appName}/${widgetName}/SIGN_UP_USER_FILED`;

/* Reducer */
const initialState = Map({
  isLoading: false,
  error: null
});

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_USER_REQUEST:
      return state.set("isLoading", true);

    case SIGN_UP_USER_SUCCESS:
      return state.set("isLoading", false);

    case SIGN_UP_USER_FILED:
      return state.set("isLoading", false).set("error", payload.error);

    default:
      return state;
  }
};

/* Actions creators */
export const signUpUser = user => ({
  type: SIGN_UP_USER_REQUEST,
  payload: { user }
});

/* Sagas */
export const signUpSaga = function*({ payload: { user } }) {
  try {
    const createdUser = yield auth.createUserWithEmailAndPassword(user.email, user.password);
    console.log('createdUser :', createdUser);
    yield createdUser.user.updateProfile({
      displayName: user.name
    });
    yield put({
      type: SIGN_UP_USER_SUCCESS
    });
  } catch (error) {
    yield put({ type: SIGN_UP_USER_FILED, payload: { error: error.message } });
  }
};

export const saga = function*() {
  yield all([takeEvery(SIGN_UP_USER_REQUEST, signUpSaga)]);
};
