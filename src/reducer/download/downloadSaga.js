import {
  fork,
  takeLatest,
  call,
  put,
  select
} from 'redux-saga/effects'
import {
  CP_AUDIO_DOWNLOAD,
  CP_AUDIO_DOWNLOAD_SUCCESS,
  CP_AUDIO_DOWNLOAD_FAILURE,
  CP_AUDIO_DOWNLOADED_INFO_GET,
  CP_AUDIO_DOWNLOADED_INFO_GET_SUCCESS,
  CP_AUDIO_DOWNLOADED_INFO_GET_FAILURE,
  CP_AUDIO_DOWNLOADED_REMOVE,
  CP_AUDIO_DOWNLOADED_REMOVE_SUCCESS,
  CP_AUDIO_DOWNLOADED_REMOVE_FAILURE
} from './downloadTypes'
import {
  UPDATE_CP_AUDIO_ISDOWNLOADED
} from '../audio/audioTypes'
import {getCapsulePath} from './downloadSelector'

import DownloadModule from '../../api/downloadModule'

/**
 * save audio data to local storage
 * @param data : object
 */

function * saveAudioFile (data) {
  let filepath = yield call(() => new DownloadModule().downloadAudio(data.payload))
  let capsules = yield call(() => new DownloadModule().getDownloadedCapsules())
  let type
  console.log(filepath)

  if (typeof filepath === 'string') {
    type = CP_AUDIO_DOWNLOAD_SUCCESS
  } else {
    type = CP_AUDIO_DOWNLOAD_FAILURE
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
      url: filepath
    }
  })
}

/**
 * get downloaded capsules
 */
function * getDownloadedCapsules () {
  let capsules = yield call(() => new DownloadModule().getDownloadedCapsules())
  let type
  console.log(capsules)

  if (typeof (capsules) === 'object') {
    type = CP_AUDIO_DOWNLOADED_INFO_GET_SUCCESS
  } else {
    type = CP_AUDIO_DOWNLOADED_INFO_GET_FAILURE
  }
  yield put({
    type,
    payload: {
      capsules
    }
  })
}
function * removeDownloadedCapsule (data) {
  let path = yield select(getCapsulePath(data.payload.parentKey, data.payload.childKey))
  yield call(() => new DownloadModule().removeCapsuleFromCache(path))
  yield call(() => new DownloadModule().removeCapsuleFromStorage(data.payload))
  yield put({
    type: UPDATE_CP_AUDIO_ISDOWNLOADED,
    payload: {
      ...data.payload,
      url: null
    }
  })
}
/***
 * watcher
 */
function * downloadSaga () {
  yield takeLatest(CP_AUDIO_DOWNLOAD, saveAudioFile)
  yield takeLatest(CP_AUDIO_DOWNLOADED_INFO_GET, getDownloadedCapsules)
  yield takeLatest(CP_AUDIO_DOWNLOADED_REMOVE, removeDownloadedCapsule)
}

export default [
  fork(downloadSaga)
]
