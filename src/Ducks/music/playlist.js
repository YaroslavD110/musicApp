import { all, put, take, takeEvery, call } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { appName } from "../../config";
import { Map } from "immutable";
import { database } from "../../firebase";
import { REGISTER_USER, UNREGISTER_USER } from "../user";

/* Actions */
export const widgetName = "playlist";
export const INITIAL_FETCH_PLAYLISTS_REQUEST = `${appName}/${widgetName}/INITIAL_FETCH_PLAYLISTS_REQUEST`;
export const INITIAL_FETCH_PLAYLISTS_SUCCESS = `${appName}/${widgetName}/INITIAL_FETCH_PLAYLISTS_SUCCESS`;
export const INITIAL_FETCH_PLAYLISTS_FILED = `${appName}/${widgetName}/INITIAL_FETCH_PLAYLISTS_FILED`;
export const PLAYLISTS_DATA_UPDATED = `${appName}/${widgetName}/PLAYLISTS_DATA_UPDATED`;
export const CLEAR_PLAYLISTS = `${appName}/${widgetName}/CLEAR_PLAYLISTS`;

/* Reducer */
const initialState = Map({
  isLoading: true,
  playlists: null,
  error: null
});

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIAL_FETCH_PLAYLISTS_REQUEST:
      return state.set("isLoading", true);

    case INITIAL_FETCH_PLAYLISTS_SUCCESS:
      return state.set("isLoading", false).set("playlists", payload.playlists);

    case INITIAL_FETCH_PLAYLISTS_FILED:
      return state.set("isLoading", false).set("error", payload);

    case CLEAR_PLAYLISTS:
      return state.set("playlists", null);

    case PLAYLISTS_DATA_UPDATED:
      return state.set("playlists", payload.playlists);

    default:
      return state;
  }
};

/* Actions creators */
export const initialPlaylistsFetch = () => ({
  type: INITIAL_FETCH_PLAYLISTS_REQUEST
});

/* Sagas */
export const uploadPlaylistsAtRegisterUserSaga = function*({ payload }) {
  try {
    yield put({ type: INITIAL_FETCH_PLAYLISTS_REQUEST });

    const playlistsRef = yield database.ref(`/${payload.userID}/playlists`);
    const playlists = yield call([playlistsRef, playlistsRef.once], "value");

    yield put({
      type: INITIAL_FETCH_PLAYLISTS_SUCCESS,
      payload: {
        playlists: playlists.val() ? Object.keys(playlists.val()) : null
      }
    });
  } catch (error) {
    yield put({
      type: INITIAL_FETCH_PLAYLISTS_FILED,
      payload: error
    });
  }
};

export const clearPlaylistAtUnregisterUserSaga = function*() {
  yield put({
    type: CLEAR_PLAYLISTS
  });
};

export const asyncUpdatePlaylistsDataSaga = function*({ payload }) {
  const playlistsRef = yield database.ref(`/${payload.userID}/playlists`);
  const playlistsChannel = yield eventChannel(emit =>
    playlistsRef.on("value", snapshot => emit(snapshot))
  );

  while (true) {
    const playlists = yield take(playlistsChannel);

    put({
      type: PLAYLISTS_DATA_UPDATED,
      payload: {
        playlists: playlists.val() ? Object.keys(playlists.val()) : null
      }
    });
  }
};

export const saga = function*() {
  yield all([
    takeEvery(REGISTER_USER, uploadPlaylistsAtRegisterUserSaga),
    takeEvery(REGISTER_USER, asyncUpdatePlaylistsDataSaga),
    takeEvery(UNREGISTER_USER, clearPlaylistAtUnregisterUserSaga)
  ]);
};
