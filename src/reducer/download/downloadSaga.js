import {
  fork,
  call,
  put,
  select,
  take
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
import downloadAPI from './downloadAPI'

import {
  UPDATE_CP_AUDIO_ISDOWNLOADED_SUCCESS
} from '../audio/audioTypes'
import audioActions from '../audio/audioAction'

/**
 * save audio data to local storage
 * @param data : object
 */

export function * saveAudioFileflow () {
  while (true) {
    try {
      const { payload } = yield take(DOWNLOAD_CP_AUDIO)
      yield put(downloadActions.downloadCpAudioRequest())
      const filepath = yield call(downloadAPI.downloadAudio, payload)
      let capsules = yield call(downloadAPI.getDownloadedCapsules)
      let isdownloaded = yield call(downloadAPI.getDownloadedCapsulesID, payload.id)
      if (typeof (filepath) !== 'string') throw new Error('incorrect filepath')
      yield put({
        type: DOWNLOAD_CP_AUDIO_SUCCESS,
        payload: {
          capsules
        }
      })
      yield put(audioActions.updateCpAudioIsdownloadedRequest())
      yield put({
        type: UPDATE_CP_AUDIO_ISDOWNLOADED_SUCCESS,
        payload: {
          ...payload,
          isdownloaded: isdownloaded
        }
      })
    } catch (error) {
      yield put({
        type: DOWNLOAD_CP_AUDIO_FAILURE
      })
    }
  }
}

/**
 * get downloaded capsules
 */
export function * getDownloadedCapsulesflow () {
  while (true) {
    try {
      yield take(GET_DOWNLOADED_CP_AUDIO)
      yield put(downloadActions.getDownloadedCpAudioRequest())
      let capsules = yield call(downloadAPI.getDownloadedCapsules)
      console.log(capsules)

      if (typeof (capsules) !== 'object') throw new Error('get downloaded capsules failed')
      yield put({
        type: GET_DOWNLOADED_CP_AUDIO_SUCCESS,
        payload: {
          capsules
        }
      })
    } catch (error) {
      yield put({type: GET_DOWNLOADED_CP_AUDIO_FAILURE})
    }
  }
}
/**
 * remove downloaded capsules
 * @param {*} data
 */
export function * removeDownloadedCapsuleflow () {
  while (true) {
    try {
      const { payload } = yield take(REMOVE_DOWNLOADED_CP_AUDIO)
      yield put(downloadActions.removeDownloadedCpAudioRequest())
      let path = payload.url
      yield call(downloadAPI.removeCapsuleFromCache, path)
      yield call(downloadAPI.removeCapsuleFromStorage, payload.id)
      let isdownloaded = yield call(downloadAPI.getDownloadedCapsulesID, payload.id)
      yield put(audioActions.updateCpAudioIsdownloadedRequest())
      yield put({
        type: UPDATE_CP_AUDIO_ISDOWNLOADED_SUCCESS,
        payload: {
          ...payload,
          isdownloaded: isdownloaded
        }
      })
      let capsules = yield call(downloadAPI.getDownloadedCapsules)
      console.log(capsules)
  
      if (typeof (capsules) !== 'object') throw new Error('remove downloaded capsules failed')
      yield put({
        type: REMOVE_DOWNLOADED_CP_AUDIO_SUCCESS,
        payload: {
          capsules
        }
      })
    } catch (error) {
      yield put({type: REMOVE_DOWNLOADED_CP_AUDIO_FAILURE})
    }
  }
}
/***
 * watcher
 */

export default [
  fork(saveAudioFileflow),
  fork(getDownloadedCapsulesflow),
  fork(removeDownloadedCapsuleflow)
]
