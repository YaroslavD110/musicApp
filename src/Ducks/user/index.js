import { all, put, take, select } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { appName } from "../../config";
import { Map } from "immutable";
import { auth } from "../../firebase";
import { push } from "react-router-redux";

/* Actions */
export const widgetName = "User";
export const REGISTER_USER = `${appName}/${widgetName}/REGISTER_USER`;
export const UNREGISTER_USER = `${appName}/${widgetName}/UNREGISTER_USER`;

export const SET_USER_PHOTO_REQUEST = `${appName}/${widgetName}/SET_USER_PHOTO_REQUEST`;
export const SET_USER_PHOTO_SUCCESS = `${appName}/${widgetName}/SET_USER_PHOTO_SUCCESS`;
export const SET_USER_PHOTO_FILED = `${appName}/${widgetName}/SET_USER_PHOTO_FILED`;

/* Reducer */
const lcStrorage = window.localStorage.getItem(appName)
  ? JSON.parse(window.localStorage.getItem(appName))
  : null;

const initialState = Map({
  isLoading: false,
  userID: !lcStrorage ? null : lcStrorage.userID,
  userName: !lcStrorage ? null : lcStrorage.userName,
  userEmail: !lcStrorage ? null : lcStrorage.userEmail,
  userPhoto: !lcStrorage ? null : lcStrorage.userPhoto,
  isLogged: !lcStrorage ? false : true
});

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return state
        .set("userID", payload.userID)
        .set("userName", payload.userName)
        .set("userEmail", payload.userEmail)
        .set("isLogged", true);

    case UNREGISTER_USER:
      return state
        .set("userID", null)
        .set("userName", null)
        .set("userEmail", null)
        .set("isLogged", false);

    default:
      return state;
  }
};

/* Actions creators */
// export const logInUser = user => ({
//   type: LOG_IN_USER_REQUEST,
//   payload: user
// });

/* Sagas */
export const watchUserStatusSaga = function*() {
  const channel = yield eventChannel(emit =>
    auth.onAuthStateChanged(user => emit({ user }))
  );

  while (true) {
    const { user } = yield take(channel);

    yield console.log("user :", user);

    if (user) {
      const newUser = {
        userID: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        userPhoto: null
      };

      yield put({
        type: REGISTER_USER,
        payload: newUser
      });

      const currentPath = yield select(state => state.Router.location.pathname);
      if (currentPath === "/login") {
        yield put(push("/"));
      }

      if (!window.localStorage.getItem(appName)) {
        yield window.localStorage.setItem(
          appName,
          JSON.stringify({ user: newUser })
        );
      }
    } else {
      yield put({
        type: UNREGISTER_USER
      });
      yield put(push("/login"));
      yield window.localStorage.clear();
    }
  }
};

export const saga = function*() {
  yield all([watchUserStatusSaga()]);
};
