import {
  fork,
  takeLatest,
  call,
  put
} from 'redux-saga/effects'
import {
  CP_AUDIO_INFO_GET_SUCCESS,
  CP_AUDIO_INFO_GET_FAILURE,
  CP_AUDIO_GOOD_CHANGE_SUCCESS,
  CP_AUDIO_GOOD_CHANGE_FAILURE,
  CP_AUDIO_GET_DOC_SUCCESS,
  CP_AUDIO_GET_DOC_FAILURE,
  CP_AUDIO_GOOD_CHANGE,
  CP_AUDIO_GET_DOC,
  CP_AUDIO_INFO_GET,
  AUDIO_PLAY,
  AUDIO_TO_NEXT_TRACK,
  AUDIO_TO_PREVIOUS_TRACK,
  AUDIO_UPDATE_INFO,
  AUDIO_UPDATE_CURRENT_TIME,
  AUDIO_GET_NEXT_TRACK,
  AUDIO_GET_PREVIOUS_TRACK
} from './audioTypes'
import AudioModule from '../../api/audioModule'

/**
 * subroutines
 */

function * getAudioInfo (data) {
  let { parentKey, capsuleId, memberUid } = data.payload
  let value = yield call(() => new AudioModule().readOnce(`capsules/${parentKey}/audios/${capsuleId}`))
  let audioIsGood = yield call(() => new AudioModule().checkAudioIsLiked(capsuleId, memberUid))
  let key
  if (value) {
    key = CP_AUDIO_INFO_GET_SUCCESS
  } else {
    key = CP_AUDIO_INFO_GET_FAILURE
  }
  yield put({
    type: key,
    payload: {
      ...value,
      audioIsGood
    }
  })
}

function * setAudioGoodState (data) {
  const { isGood, capsulesId, parentKey, userId } = data.payload
  let audioInfo = yield call(() => new AudioModule().getAudioInfo(capsulesId, parentKey))
  try {
    let likeCounter = yield call(() => new AudioModule()[isGood ? 'cpAudioGood' : 'cpAudioNotGood'](capsulesId, parentKey, userId, audioInfo.likeCounter + (isGood ? +1 : -1)))
    yield put({
      type: CP_AUDIO_GOOD_CHANGE_SUCCESS,
      payload: {
        isGood,
        likeCounter
      }
    })
  } catch (e) {
    yield put({
      type: CP_AUDIO_GOOD_CHANGE_FAILURE,
      payload: e
    })
  }
}

function * getAudioDoc (data) {
  let { capsuleId, parentKey } = data.payload
  let draft = yield call(() => new AudioModule().getAudioDoc(capsuleId, parentKey))
  let type

  if (typeof draft === 'string') {
    type = CP_AUDIO_GET_DOC_SUCCESS
  } else {
    type = CP_AUDIO_GET_DOC_FAILURE
  }
  yield put({
    type,
    payload: {
      draft
    }
  })
}

/**
 * player subroutines
 */

 function * audioPlay () {

 }

 function * audioPause () {

 }

 function * audioToNextTrack () {

 }

 function * audioToPreviousTrack () {

 }

 function * audioUpdateInfo () {

 }

 function * audioGetNextTrack () {

 }

 function * audioGetPreviousTrack () {

 }

/***
 * watcher
 */
function * audioSaga () {
  yield takeLatest(AUDIO_PLAY, audioPlay)
  yield takeLatest(AUDIO_TO_NEXT_TRACK, audioPause)
  yield takeLatest(AUDIO_TO_PREVIOUS_TRACK, audioToNextTrack)
  yield takeLatest(AUDIO_UPDATE_INFO, audioToPreviousTrack)
  yield takeLatest(AUDIO_UPDATE_CURRENT_TIME, audioUpdateInfo)
  yield takeLatest(AUDIO_GET_NEXT_TRACK, audioGetNextTrack)
  yield takeLatest(AUDIO_GET_PREVIOUS_TRACK, audioGetPreviousTrack)
  yield takeLatest(CP_AUDIO_INFO_GET, getAudioInfo)
  yield takeLatest(CP_AUDIO_GOOD_CHANGE, setAudioGoodState)
  yield takeLatest(CP_AUDIO_GET_DOC, getAudioDoc)
}

export default [
  fork(audioSaga)
]
