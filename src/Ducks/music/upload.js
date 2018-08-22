import { all, takeEvery, put } from "redux-saga/effects";
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
  const fullSongName = `${songID}.mp3`;
  const storageRef = storage.ref(`/${userID}/songs/${fullSongName}`);
  const databseRef = database.ref(`/${userID}`);

  try {
    yield storageRef.put(song);
    yield databseRef.child(`/playlists/${playlist}`).push({
      song: fullSongName
    });
    yield databseRef.child(`/songs`).push({
      songName: songName,
      songRef: fullSongName,
      songPlaylist: playlist
    });
    yield put({
      type: UPLOAD_SONG_SUCCESS
    });
    yield successToast("Uploading success");
  } catch (error) {
    yield put({
      type: UPLOAD_SONG_FILED,
      payload: error
    });
    yield errorToast("Uploading filed!");
  }
};

export const saga = function*() {
  yield all([takeEvery(UPLOAD_SONG_REQUEST, uplaodSaga)]);
};
