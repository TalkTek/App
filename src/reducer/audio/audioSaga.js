// @flow
import {
  fork,
  takeLatest,
  call,
  put,
  select
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
  AUDIO_LOAD,
  AUDIO_LOADED,
  AUDIO_PLAY,
  AUDIO_PAUSE,
  AUDIO_TO_NEXT_TRACK,
  AUDIO_TO_PREVIOUS_TRACK,
  AUDIO_UPDATE_INFO,
  AUDIO_UPDATE_CURRENT_TIME,
  AUDIO_GET_NEXT_TRACK,
  AUDIO_GET_PREVIOUS_TRACK
} from './audioTypes'
import AudioModule from '../../api/audioModule'
import playerModule from '../../api/playerModule'

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
type arg = {[key: string]: number}
function * audioLoad (value:{payload: { [audio: string]: {}, i: arg, j: arg }}) {
  const {
    payload: {
      audio
    }
  } = value
  yield call(() => playerModule.load(audio.url))
  yield put({ type: AUDIO_LOADED })
}

function * audioLoaded () {
  yield put({ type: AUDIO_PLAY })
}

function * audioPlay () {
  yield call(() => playerModule.play())
}

function * audioPause () {
  yield call(() => playerModule.pause())
}

const getInfo: {} = (state) => state.audio.playingAudioInfo

function * audioToNextTrack () {
  let audioInfo = yield select(getInfo)
  console.log(audioInfo)
}

const getAudios: {} = (state) => state.audio
const makePlain = (capsules) => {
  let data = []
  for (let i in capsules) {
    data = [
      ...data,
      ...capsules[i].audios
    ]
  }
  return data
}

function * audioToPreviousTrack () {
  let audios = yield select(getAudios)
  let {i, j} = audios.playingAudioInfo.pos
  let data = makePlain(audios.capsules)
  // let length = audio.capsules[i].length
  
}

function * audioUpdateInfo () {

}

function * audioGetNextTrack () {

}

function * audioGetPreviousTrack () {

}

function * audioUpdateCurrentTime () {
  let value = playerModule.currentTime * 0.001
  value = value<0? 0: value
  let sec = Math.floor(value % 60)
  let min = Math.floor(value / 60)

  if (sec < 10) { sec = `0${sec}` }
  if (min < 10) { min = `0${min}` }

  let formatted = `${min}:${sec}`
  yield put({ type: AUDIO_UPDATE_INFO, payload: {
    currentTime: {
      sec: value,
      formatted
    }
  }})
}

/***
 * watcher
 */
function * audioSaga () {
  yield takeLatest(AUDIO_LOAD, audioLoad)
  yield takeLatest(AUDIO_LOADED, audioLoaded)
  yield takeLatest(AUDIO_PLAY, audioPlay)
  yield takeLatest(AUDIO_PAUSE, audioPause)
  yield takeLatest(AUDIO_TO_NEXT_TRACK, audioToNextTrack)
  yield takeLatest(AUDIO_TO_PREVIOUS_TRACK, audioToPreviousTrack)
  yield takeLatest(AUDIO_UPDATE_INFO, audioUpdateInfo)
  yield takeLatest(AUDIO_GET_NEXT_TRACK, audioGetNextTrack)
  yield takeLatest(AUDIO_GET_PREVIOUS_TRACK, audioGetPreviousTrack)
  yield takeLatest(AUDIO_UPDATE_CURRENT_TIME, audioUpdateCurrentTime)
  yield takeLatest(CP_AUDIO_INFO_GET, getAudioInfo)
  yield takeLatest(CP_AUDIO_GOOD_CHANGE, setAudioGoodState)
  yield takeLatest(CP_AUDIO_GET_DOC, getAudioDoc)
}

export default [
  fork(audioSaga)
]
