import { all, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { appName } from "../../config";
import { Map } from "immutable";
import { auth } from "../../firebase";
import { push } from "react-router-redux";

/* Actions */
export const widgetName = "User";
export const REGISTER_USER = `${appName}/${widgetName}/REGISTER_USER`;
export const UNREGISTER_USER = `${appName}/${widgetName}/UNREGISTER_USER`;

/* Reducer */
const initialState = Map({
  userID: window.localStorage.getItem(appName)
    ? JSON.parse(window.localStorage.getItem(appName)).userID
    : null,
  isLogged: window.localStorage.getItem(appName) ? true : false
});

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return state.set("userID", payload.userID).set("isLogged", true);

    case UNREGISTER_USER:
      return state.set("userID", null).set("isLogged", false);

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
      yield put({
        type: REGISTER_USER,
        payload: { userID: user.uid }
      });
      yield put(push("/"));
      yield window.localStorage.setItem(
        appName,
        JSON.stringify({ user: { userID: user.uid } })
      );
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
