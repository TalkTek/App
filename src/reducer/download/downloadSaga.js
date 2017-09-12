import {
  fork,
  takeLatest,
  call,
  put,
  select
} from 'redux-saga/effects'
import {
  DOWNLOAD_CP_AUDIO,
  DOWNLOAD_CP_AUDIO_REQUEST,
  DOWNLOAD_CP_AUDIO_SUCCESS,
  DOWNLOAD_CP_AUDIO_FAILURE,
  GET_DOWNLOADED_CP_AUDIO,
  GET_DOWNLOADED_CP_AUDIO_REQUEST,
  GET_DOWNLOADED_CP_AUDIO_SUCCESS,
  GET_DOWNLOADED_CP_AUDIO_FAILURE,
  REMOVE_DOWNLOADED_CP_AUDIO,
  REMOVE_DOWNLOADED_CP_AUDIO_REQUEST,
  REMOVE_DOWNLOADED_CP_AUDIO_SUCCESS,
  REMOVE_DOWNLOADED_CP_AUDIO_FAILURE
} from './downloadTypes'
import downloadActions from './downloadAction'
import {
  UPDATE_CP_AUDIO_ISDOWNLOADED
} from '../audio/audioTypes'
import downloadAPI from './downloadAPI'

/**
 * save audio data to local storage
 * @param data : object
 */

function * saveAudioFileflow (data) {
  yield put(downloadActions.downloadCpAudioRequest())
  let filepath = yield call(downloadAPI.downloadAudio, data.payload)
  let capsules = yield call(downloadAPI.getDownloadedCapsules)
  let isdownloaded = yield call(downloadAPI.getDownloadedCapsulesID, data.payload.id)
  let type
  console.log(filepath)

  if (typeof filepath === 'string') {
    type = DOWNLOAD_CP_AUDIO_SUCCESS
  } else {
    type = DOWNLOAD_CP_AUDIO_FAILURE
  }
  yield put({
    type,
    payload: {
      capsules
    }
  })
  yield put({
    type: UPDATE_CP_AUDIO_ISDOWNLOADED,
    payload: {
      ...data.payload,
      isdownloaded: isdownloaded
    }
  })
}

/**
 * get downloaded capsules
 */
function * getDownloadedCapsulesflow () {
  yield put(downloadActions.getDownloadedCpAudioRequest())
  let capsules = yield call(downloadAPI.getDownloadedCapsules)
  let type
  console.log(capsules)

  if (typeof (capsules) === 'object') {
    type = GET_DOWNLOADED_CP_AUDIO_SUCCESS
  } else {
    type = GET_DOWNLOADED_CP_AUDIO_FAILURE
  }
  yield put({
    type,
    payload: {
      capsules
    }
  })
}
function * removeDownloadedCapsuleflow (data) {
  yield put(downloadActions.removeDownloadedCpAudioRequest())
  let path = data.payload.url
  yield call(downloadAPI.removeCapsuleFromCache, path)
  yield call(downloadAPI.removeCapsuleFromStorage, data.payload.id)
  let isdownloaded = yield call(downloadAPI.getDownloadedCapsulesID, data.payload.id)
  yield put({
    type: UPDATE_CP_AUDIO_ISDOWNLOADED,
    payload: {
      ...data.payload,
      isdownloaded: isdownloaded
    }
  })
  let capsules = yield call(downloadAPI.getDownloadedCapsules)
  let type
  console.log(capsules)

  if (typeof (capsules) === 'object') {
    type = REMOVE_DOWNLOADED_CP_AUDIO_SUCCESS
  } else {
    type = REMOVE_DOWNLOADED_CP_AUDIO_FAILURE
  }
  yield put({
    type,
    payload: {
      capsules
    }
  })
}
/***
 * watcher
 */
export function * downloadSaga () {
  yield takeLatest(DOWNLOAD_CP_AUDIO, saveAudioFileflow)
  yield takeLatest(GET_DOWNLOADED_CP_AUDIO, getDownloadedCapsulesflow)
  yield takeLatest(REMOVE_DOWNLOADED_CP_AUDIO, removeDownloadedCapsuleflow)
}

export default [
  fork(downloadSaga)
]
