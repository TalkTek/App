import {
  fork,
  takeLatest,
  call,
  put
} from 'redux-saga/effects'
import {
  CP_AUDIO_DOWNLOAD,
  CP_AUDIO_DOWNLOAD_SUCCESS,
  CP_AUDIO_DOWNLOAD_FAILURE,
  CP_AUDIO_DOWNLOADED_INFO_GET,
  CP_AUDIO_DOWNLOADED_INFO_GET_SUCCESS,
  CP_AUDIO_DOWNLOADED_INFO_GET_FAILURE
} from './downloadTypes.js'

import DownloadModule from '../../api/downloadModule'

/**
 * subroutines
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
}

function * getCapsulesInfo () {
  //let filepath = yield call(() => new DownloadModule().downloadAudio(data.payload))
  let capsules = yield call(() => new DownloadModule().getDownloadedCapsules())
  let type
  //console.log(filepath)
  console.log(capsules)

  if (Array.isArray(capsules)) {
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
/***
 * watcher
 */
function * downloadSaga () {
  yield takeLatest(CP_AUDIO_DOWNLOAD, saveAudioFile)
  yield takeLatest(CP_AUDIO_DOWNLOADED_INFO_GET, getCapsulesInfo)
}

export default [
  fork(downloadSaga)
]
