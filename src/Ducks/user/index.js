import { all, put, take, select, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { appName } from "../../config";
import { Map } from "immutable";
import firebase, { auth, storage } from "../../firebase";
import { errorToast, successToast } from "../../utils/toasts";
import { push } from "react-router-redux";

/* Actions */
export const widgetName = "User";
export const REGISTER_USER = `${appName}/${widgetName}/REGISTER_USER`;
export const UNREGISTER_USER = `${appName}/${widgetName}/UNREGISTER_USER`;

export const UPDATE_USER_DATA_REQUEST = `${appName}/${widgetName}/UPDATE_USER_DATA_REQUEST`;
export const UPDATE_USER_DATA_SUCCESS = `${appName}/${widgetName}/UPDATE_USER_DATA_SUCCESS`;
export const UPDATE_USER_DATA_FILED = `${appName}/${widgetName}/UPDATE_USER_DATA_FILED`;

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
      return state.set("isLogged", true).merge(payload.newUser);

    case UNREGISTER_USER:
      return state
        .set("userID", null)
        .set("userName", null)
        .set("userEmail", null)
        .set("userPhoto", null)
        .set("isLogged", false);

    case UPDATE_USER_DATA_REQUEST:
      return state.set("isLoading", true);

    case UPDATE_USER_DATA_SUCCESS:
      return state.set("isLoading", false).merge(payload.data);

    case UPDATE_USER_DATA_FILED:
      return state.set("isLoading", false);

    default:
      return state;
  }
};

/* Actions creators */
export const updateUserData = data => ({
  type: UPDATE_USER_DATA_REQUEST,
  payload: { data }
});

/* Sagas */
export const watchUserStatusSaga = function*() {
  const channel = yield eventChannel(emit =>
    auth.onAuthStateChanged(user => emit({ user }))
  );

  while (true) {
    const { user } = yield take(channel);

    if (user) {
      const newUser = {
        userID: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL
      };

      yield put({
        type: REGISTER_USER,
        payload: { newUser }
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

export const updateUserDataSaga = function*({ payload: { data } }) {
  const User = auth.currentUser;
  const newUserData = {};

  try {
    if (data.email) {
      if (!data.password) throw new Error();

      yield User.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(User.email, data.password)
      );

      yield User.updateEmail(data.email);
      newUserData.userEmail = data.email;
    }

    if (data.newPassword) {
      if (!data.oldPassword) throw new Error();

      yield User.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(User.email, data.oldPassword)
      );

      yield User.updatePassword(data.newPassword);
    }

    if (data.avatar) {
      const avatarStorageRef = storage.ref(`/${User.uid}/images/avatar`);
      const avatar = data.avatar[0];

      if (User.photoURL) yield avatarStorageRef.delete();
      yield avatarStorageRef.put(avatar);

      data.newAvatar = yield avatarStorageRef.getDownloadURL();
    }

    if (data.name || data.newAvatar) {
      yield User.updateProfile({
        displayName: data.name || User.displayName,
        photoURL: data.newAvatar || User.photoURL
      });
      newUserData.userName = data.name || User.displayName;
      newUserData.userPhoto = data.newAvatar || User.photoURL;
    }

    yield put({
      type: UPDATE_USER_DATA_SUCCESS,
      payload: {
        data: newUserData
      }
    });

    yield successToast("Data was successfully changed");
  } catch (error) {
    yield put({ type: UPDATE_USER_DATA_FILED, payload: error });
    yield errorToast("Oh, something went wrong");
  }
};

export const saga = function*() {
  yield all([
    watchUserStatusSaga(),
    takeEvery(UPDATE_USER_DATA_REQUEST, updateUserDataSaga)
  ]);
};
