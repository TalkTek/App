// @flow
import {
  fork,
  takeLatest,
  call,
  put,
  select
} from 'redux-saga/effects'
import {
  CP_AUDIO_INFO_GET,
  CP_AUDIO_INFO_GET_SUCCESS,
  CP_AUDIO_INFO_GET_FAILURE,
  CP_AUDIO_GOOD_CHANGE_SUCCESS,
  CP_AUDIO_GOOD_CHANGE_FAILURE,
  CP_AUDIO_GET_DOC_SUCCESS,
  CP_AUDIO_GET_DOC_FAILURE,
  CP_AUDIO_GOOD_CHANGE,
  CP_AUDIO_GET_DOC,
  AUDIO_LOAD,
  AUDIO_LOADED,
  AUDIO_PLAY,
  AUDIO_PAUSE,
  AUDIO_SEEK,
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
    let likeCounter = yield call(() => new AudioModule()[isGood ? 'cpAudioGood' : 'cpAudioNotGood'](capsulesId, parentKey, userId, (audioInfo.likeCounter||0) + (isGood ? +1 : -1)))
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
function * audioLoad (value:{payload: { [audio: string]: {}, pos: number }}) {
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
const getAudios: {} = (state) => state.audio

function * selectTrack (offset: number) {
  let audios = yield select(getAudios)
  let {pos} = audios.playingAudioInfo.pos
  let datas = makePlain(audios.capsules)
  let index = pos + offset
  let returnIndex = 0
  let data
  if (index < 0) {
    returnIndex = datas.length - 1
  }
  else if (index >= datas.length) {
    returnIndex = 0
  } else {
    returnIndex = index
  }
  
  const iJ = countIJ(audios, returnIndex)
  return { audio: datas[returnIndex], ...iJ, pos: returnIndex }
}

function countIJ (audios, index: number) {
  // counte for i,j
  let j = 0
  let i = 0
  for (i in audios.capsules) {
    if (index - audios.capsules[i].audios.length >= 0) {
      index -= audios.capsules[i].audios.length
    } else {
      j = index
      break
    }
  }

  return {
    i, j
  }
}

function * audioToNextTrack () {
  let capsule = yield call(() => selectTrack(+1))
  console.log(capsule)
  yield put({
    type: CP_AUDIO_INFO_GET,
    payload: {
      parentKey: capsule.audio.parentKey,
      capsuleId: capsule.audio.id,
      memberUid: yield select((state) => (state.member.uid))
    }
  })
  yield put({
    type: AUDIO_LOAD,
    payload: capsule
  })
}

const makePlain = (capsules: []) => {
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
  let capsule = yield call(() => selectTrack(-1))

  yield put({
    type: CP_AUDIO_INFO_GET,
    payload: {
      parentKey: capsule.audio.parentKey,
      capsuleId: capsule.audio.id,
      memberUid: yield select((state) => (state.member.uid))
    }
  })
  yield put({
    type: AUDIO_LOAD,
    payload: capsule
  })
}

function * audioUpdateInfo () {

}

function * audioSeek({ payload }) {
  let data = yield call(() => playerModule.seek(payload*1000))
}

function * audioUpdateCurrentTime () {
  let endTime = yield select((state) => state.audio.playingAudioInfo.length.sec)
  let value = playerModule.currentTime * 0.001
  value = value<0? 0: value
  let sec = Math.floor(value % 60)
  let min = Math.floor(value / 60)

  if (sec < 10) { sec = `0${sec}` }
  if (min < 10) { min = `0${min}` }

  let formatted = `${min}:${sec}`
  // console.log(value === endTime)
  if (value >= endTime - 1) {
    console.log('next')
    yield put({
      type: AUDIO_TO_NEXT_TRACK
    })
  }
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
  yield takeLatest(AUDIO_SEEK, audioSeek)
  yield takeLatest(AUDIO_TO_NEXT_TRACK, audioToNextTrack)
  yield takeLatest(AUDIO_TO_PREVIOUS_TRACK, audioToPreviousTrack)
  yield takeLatest(AUDIO_UPDATE_INFO, audioUpdateInfo)
  yield takeLatest(AUDIO_UPDATE_CURRENT_TIME, audioUpdateCurrentTime)
  yield takeLatest(CP_AUDIO_INFO_GET, getAudioInfo)
  yield takeLatest(CP_AUDIO_GOOD_CHANGE, setAudioGoodState)
  yield takeLatest(CP_AUDIO_GET_DOC, getAudioDoc)
}

export default [
  fork(audioSaga)
]
