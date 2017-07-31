import {
  fork,
  takeLatest,
  call,
  put
} from 'redux-saga/effects'
import AudioTypes from './audioTypes'
import AudioModule from '../../api/audioModule'

/**
 * subroutines
 */

function * getAudioInfo (data) {
  let { parentKey, capsuleId, memberUid } = data.payload
  let value = yield call(() => new AudioModule().readOnce(`capsules/${parentKey}/audios/${capsuleId}`))
  let audioIsGood = yield call(() => new AudioModule().checkAudioIsLiked(capsuleId, memberUid))

  yield put({ type: AudioTypes.CP_AUDIO_INFO_GET_SUCCESS,
    payload: {
      ...value,
      audioIsGood
    }
  })
}

function * setAudioGoodState (data) {
  const { isGood, capsulesId, parentKey, userId } = data.payload
  let likeCounter = yield call(() => new AudioModule()[isGood ? 'cpAudioGood' : 'cpAudioNotGood'](capsulesId, parentKey, userId))

  yield put({
    type: AudioTypes.CP_AUDIO_GOOD_CHANGE_SUCCESS,
    payload: {
      isGood,
      likeCounter
    }
  })
}

function * getAudioDoc (data) {
  let { capsuleId, parentKey } = data.payload
  let draft = yield call(() => new AudioModule().getAudioDoc(capsuleId, parentKey))

  yield put({
    type: AudioTypes.CP_AUDIO_GET_DOC_SUCCESS,
    payload: {
      draft
    }
  })
}

/***
 * watcher
 */
function * audioSaga () {
  yield takeLatest(AudioTypes.CP_AUDIO_INFO_GET, getAudioInfo)
  yield takeLatest(AudioTypes.CP_AUDIO_GOOD_CHANGE, setAudioGoodState)
  yield takeLatest(AudioTypes.CP_AUDIO_GET_DOC, getAudioDoc)
}

export default [
  fork(audioSaga)
]
