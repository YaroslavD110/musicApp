import { all, put, takeEvery, call, take, select } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { appName } from "../../config";
import { Map, List } from "immutable";
import { database, storage } from "../../firebase";
import { REGISTER_USER, UNREGISTER_USER } from "../user";
import { errorToast, successToast } from "../../utils/toasts";

/* Actions */
export const widgetName = "songs";
export const INITIAL_FETCH_SONGS_REQUEST = `${appName}/${widgetName}/INITIAL_FETCH_SONGS_REQUEST`;
export const INITIAL_FETCH_SONGS_SUCCESS = `${appName}/${widgetName}/INITIAL_FETCH_SONGS_SUCCESS`;
export const INITIAL_FETCH_SONGS_FILED = `${appName}/${widgetName}/INITIAL_FETCH_SONGS_FILED`;
export const AUTO_SONGS_DATA_UPDATED = `${appName}/${widgetName}/AUTO_SONGS_DATA_UPDATED`;
export const SONGS_DATA_UPDATE_FILED = `${appName}/${widgetName}/SONGS_DATA_UPDATE_FILED`;
export const CLEAR_SONGS_DATA = `${appName}/${widgetName}/CLEAR_SONGS_DATA`;
export const DELETE_SONG_REQUEST = `${appName}/${widgetName}/DELETE_SONG_REQUEST`;
export const UPDATE_SONG_REQUEST = `${appName}/${widgetName}/UPDATE_SONG_REQUEST`;
export const FETCHING_SONGS_DATA_REQUEST = `${appName}/${widgetName}/FETCHING_SONGS_DATA_REQUEST`;
export const FETCHING_SONGS_DATA_SUCCESS = `${appName}/${widgetName}/FETCHING_SONGS_DATA_SUCCESS`;
export const FETCHING_SONGS_DATA_FILED = `${appName}/${widgetName}/FETCHING_SONGS_DATA_FILED`;

/* Reducer */
const initialState = Map({
  isLoading: true,
  songs: null,
  error: null
});

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIAL_FETCH_SONGS_REQUEST:
      return state.set("isLoading", true);

    case INITIAL_FETCH_SONGS_SUCCESS:
      return state.set("isLoading", false).set("songs", payload.songs);

    case INITIAL_FETCH_SONGS_FILED:
      return state.set("isLoading", false).set("error", payload);

    case CLEAR_SONGS_DATA:
      return state.set("songs", null);

    case AUTO_SONGS_DATA_UPDATED:
      return state.set("songs", payload.songs);

    case SONGS_DATA_UPDATE_FILED:
      return state.set("error", payload);

    case FETCHING_SONGS_DATA_REQUEST:
      return state.set("isLoading", true);

    case FETCHING_SONGS_DATA_SUCCESS:
      return state.set("isLoading", false);

    case FETCHING_SONGS_DATA_FILED:
      return state.set("isLoading", false).set("error", payload);

    default:
      return state;
  }
};

/* Actions creators */
export const deleteSong = id => ({
  type: DELETE_SONG_REQUEST,
  payload: {
    id
  }
});

export const updateSong = newSongObj => ({
  type: UPDATE_SONG_REQUEST,
  payload: { newSongObj }
});

/* Sagas */
const normalizeSongsData = songs => {
  let newSongs = songs.val();

  newSongs = Object.keys(newSongs).map((id, index) => {
    let currentSong = Object.values(newSongs)[index];
    currentSong.songID = id;
    return currentSong;
  });

  return List(newSongs);
};

export const initialSongsFetchSaga = function*({ payload: { newUser: User } }) {
  const songsRef = database.ref(`/${User.userID}/songs`);

  try {
    yield put({ type: INITIAL_FETCH_SONGS_REQUEST });

    const songs = yield call([songsRef, songsRef.once], "value");

    yield put({
      type: INITIAL_FETCH_SONGS_SUCCESS,
      payload: {
        songs: songs.val() && normalizeSongsData(songs)
      }
    });
  } catch (error) {
    yield call(errorToast, "Filed to load data, please reload page");
    yield put({
      type: INITIAL_FETCH_SONGS_FILED,
      payload: error
    });
  }
};

export const clearSongsListSaga = function*() {
  yield put({
    type: CLEAR_SONGS_DATA
  });
};

export const asyncUpdateSongsDataSaga = function*({
  payload: { newUser: User }
}) {
  const songsRef = database.ref(`/${User.userID}/songs`);

  try {
    const songsChannel = yield eventChannel(emit =>
      songsRef.on("value", snapshot => emit(snapshot))
    );

    while (true) {
      const songs = yield take(songsChannel);
      yield put({
        type: AUTO_SONGS_DATA_UPDATED,
        payload: {
          songs: songs.val() && normalizeSongsData(songs)
        }
      });
    }
  } catch (error) {
    yield call(errorToast, "Filed to load data, please reload page");
    yield put({
      type: SONGS_DATA_UPDATE_FILED,
      payload: error
    });
  }
};

export const deleteSongSaga = function*({ payload: { id: songID } }) {
  const userID = yield select(state => state.User.get("userID"));
  const songInfoRef = database.ref(`/${userID}/songs/${songID}`);
  const songFileRef = storage.ref(`/${userID}/songs/${songID}`);

  try {
    yield put({ type: FETCHING_SONGS_DATA_REQUEST });

    yield call([songInfoRef, songInfoRef.remove]);
    yield call([songFileRef, songFileRef.delete]);

    yield call(successToast, "Song successfully deleted");
    yield put({ type: FETCHING_SONGS_DATA_SUCCESS });
  } catch (error) {
    yield call(errorToast, "Filed to delete song, please reload page");
    yield put({
      type: FETCHING_SONGS_DATA_FILED,
      payload: error
    });
  }
};

export const updateSongSaga = function*({ payload: { newSongObj } }) {
  const userID = yield select(state => state.User.get("userID"));
  const songRef = database.ref(`/${userID}/songs/${newSongObj.songID}`);

  try {
    yield put({ type: FETCHING_SONGS_DATA_REQUEST });

    yield call([songRef, songRef.set], {
      songName: newSongObj.songName,
      songPlaylist: newSongObj.songPlaylist,
      songURL: newSongObj.songURL
    });

    yield call(successToast, "Song successfully updated");
    yield put({ type: FETCHING_SONGS_DATA_SUCCESS });
  } catch (error) {
    yield call(errorToast, "Filed to update song, please reload page");
    yield put({
      type: FETCHING_SONGS_DATA_FILED,
      payload: error
    });
  }
};

export const saga = function*() {
  yield all([
    takeEvery(REGISTER_USER, initialSongsFetchSaga),
    takeEvery(REGISTER_USER, asyncUpdateSongsDataSaga),
    takeEvery(UNREGISTER_USER, clearSongsListSaga),
    takeEvery(DELETE_SONG_REQUEST, deleteSongSaga),
    takeEvery(UPDATE_SONG_REQUEST, updateSongSaga)
  ]);
};
