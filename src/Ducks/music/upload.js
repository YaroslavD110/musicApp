import { all, takeEvery, put, call } from "redux-saga/effects";
import { appName } from "../../config";
import { storage, database } from "../../firebase";
import { Map } from "immutable";
import { errorToast, successToast } from "../../utils/toasts";
import getUuid from "../../utils/getUuid";

/* Actions */
export const widgetName = "upload";
export const UPLOAD_SONG_REQUEST = `${appName}/${widgetName}/UPLOAD_SONG_REQUEST`;
export const UPLOAD_SONG_SUCCESS = `${appName}/${widgetName}/UPLOAD_SONG_SUCCESS`;
export const UPLOAD_SONG_FILED = `${appName}/${widgetName}/UPLOAD_SONG_FILED`;

/* Reducer */
const initialState = Map({
  isLoading: false,
  error: null
});

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPLOAD_SONG_REQUEST:
      return state.set("isLoading", true);

    case UPLOAD_SONG_SUCCESS:
      return state.set("isLoading", false);

    case UPLOAD_SONG_FILED:
      return state.set("isLoading", false).set("error", payload);

    default:
      return state;
  }
};

/* Actions creators */
export const UploadSong = songObj => ({
  type: UPLOAD_SONG_REQUEST,
  payload: songObj
});

/* Sagas */
export const uplaodSaga = function*({
  payload: { userID, songName, playlist, song }
}) {
  const songID = getUuid();
  const storageRef = storage.ref(`/${userID}/songs/${songID}`);
  const databseRef = database.ref(`/${userID}`);

  try {
    yield call([storageRef, storageRef.put], song);

    const songURL = yield call([storageRef, storageRef.getDownloadURL]);
    const songsRef = yield call(
      [databseRef, databseRef.child],
      `/songs/${songID}`
    );
    const playlistsRef = yield call(
      [databseRef, databseRef.child],
      "/playlists"
    );

    const lists = yield call([playlistsRef, playlistsRef.once], "value");
    if (
      !lists.val() ||
      !Object.values(lists.val()).find(name => name === playlist)
    ) {
      yield call([playlistsRef, playlistsRef.push], playlist);
    }

    yield call([songsRef, songsRef.set], {
      songName,
      songURL,
      songPlaylist: playlist
    });

    yield call(successToast, "Uploading success");

    yield put({
      type: UPLOAD_SONG_SUCCESS
    });
  } catch (error) {
    yield call(errorToast, "Uploading filed!");

    yield put({
      type: UPLOAD_SONG_FILED,
      payload: error
    });
  }
};

export const saga = function*() {
  yield all([takeEvery(UPLOAD_SONG_REQUEST, uplaodSaga)]);
};
