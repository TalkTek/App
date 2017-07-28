import {
  fork,
  takeLatest,
  call,
  put
} from 'redux-saga/effects'
import AudioAction from './audioAction'
import AudioTypes from './audioTypes'
import AudioModule from '../../api/audioModule'

/**
 * subroutines
 */

function * getAudioInfo(data) {
  let { parentKey, capsuleId, memberUid } = data.payload
  let value = yield call(() => new AudioModule().readOnce(`capsules/${parentKey}/audios/${capsuleId}`))
  let audioIsGood = yield call(() => new AudioModule().checkAudioIsLiked(capsuleId, memberUid))

  yield put({ type: 'CP_AUDIO_INFO_GET_SUCCESS', 
    payload: {
      ...value,
      audioIsGood
    }
  })
}

function * setAudioGoodState (data) {
  const { isGood, capsulesId, parentKey, userId } = data.payload
  let likeCounter = yield call(() => new AudioModule()[isGood? 'cpAudioGood': 'cpAudioNotGood'](capsulesId, parentKey, userId))
  
  yield put ({
    type: 'CP_AUDIO_GOOD_CHANGE_SUCCESS',
    payload: {
      isGood,
      likeCounter
    }
  })
}

/***
 * watcher
 */
function* audioSaga() {
  yield takeLatest(AudioTypes.CP_AUDIO_INFO_GET, getAudioInfo)
  yield takeLatest(AudioTypes.CP_AUDIO_GOOD_CHANGE, setAudioGoodState)
}

export default [
  fork(audioSaga)
]
