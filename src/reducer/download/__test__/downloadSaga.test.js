import { testSaga, expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import downloadAPI from '../downloadAPI'
import {
  saveAudioFileflow,
  getDownloadedCapsulesflow,
  removeDownloadedCapsuleflow
} from '../downloadSaga'
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
} from '../downloadTypes'

import {
  UPDATE_CP_AUDIO_ISDOWNLOADED,
  UPDATE_CP_AUDIO_ISDOWNLOADED_REQUEST,
  UPDATE_CP_AUDIO_ISDOWNLOADED_SUCCESS,
  UPDATE_CP_AUDIO_ISDOWNLOADED_FAILURE
} from '../../audio/audioTypes'

const data = {payload: {downloaded: false}}

it('save audio flow', () => {
  return expectSaga(saveAudioFileflow)
    .provide([
      [matchers.call.fn(downloadAPI.downloadAudio), 'some path'],
      [matchers.call.fn(downloadAPI.getDownloadedCapsules), data.payload],
      [matchers.call.fn(downloadAPI.getDownloadedCapsulesID), true]
    ])
    .put({type: DOWNLOAD_CP_AUDIO_REQUEST})
    .put({type: DOWNLOAD_CP_AUDIO_SUCCESS, payload: {capsules: data.payload}})
    .put({type: UPDATE_CP_AUDIO_ISDOWNLOADED_REQUEST})
    .put({type: UPDATE_CP_AUDIO_ISDOWNLOADED_SUCCESS, payload: {...data.payload, isdownloaded: true}})
    .dispatch({type: DOWNLOAD_CP_AUDIO, payload: data.payload})
    .run()
})

it('get downloaded audio flow', () => {
  return expectSaga(getDownloadedCapsulesflow)
  .provide([
    [matchers.call.fn(downloadAPI.getDownloadedCapsules), data.payload]
  ])
  .put({type: GET_DOWNLOADED_CP_AUDIO_REQUEST})
  .put({type: GET_DOWNLOADED_CP_AUDIO_SUCCESS, payload: {capsules: data.payload}})
  .dispatch({type: GET_DOWNLOADED_CP_AUDIO})
  .run()
})

it('remove audio flow', () => {
  return expectSaga(removeDownloadedCapsuleflow)
  .provide([
    [matchers.call.fn(downloadAPI.removeCapsuleFromCache)],
    [matchers.call.fn(downloadAPI.removeCapsuleFromStorage)],
    [matchers.call.fn(downloadAPI.getDownloadedCapsules), {}],
    [matchers.call.fn(downloadAPI.getDownloadedCapsulesID), false]
  ])
  .put({type: REMOVE_DOWNLOADED_CP_AUDIO_REQUEST})
  .put({type: UPDATE_CP_AUDIO_ISDOWNLOADED_REQUEST})
  .put({type: UPDATE_CP_AUDIO_ISDOWNLOADED_SUCCESS, payload: {...data.payload, isdownloaded: false}})
  .put({type: REMOVE_DOWNLOADED_CP_AUDIO_SUCCESS, payload: {capsules: {}}})
  .dispatch({type: REMOVE_DOWNLOADED_CP_AUDIO, payload: data.payload})
  .run()
})
