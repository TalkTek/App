import {
  fork,
  call,
  put,
  all,
  takeLatest
} from 'redux-saga/effects'
import capsuleTypes from './capsuleTypes'
import CapsuleModule from '../../api/capsuleModule'

/**
 * subroutines
 */

function * loadCapsules ({payload}) {
  let { lastKey, limitToLast } = payload
  let capsules
  let capsule = []
  let audios = []
  let capPush
  let length = 0

  if (lastKey) {
    capPush = yield call(() => new CapsuleModule().loadLimitWithLastKey(limitToLast + 1, lastKey))
  } else {
    capPush = yield call(() => new CapsuleModule().loadLimit(limitToLast + 1))
  }

  capsules = Object.keys(capPush)
  lastKey = capsules[0]

  if (capsules.length === limitToLast + 1) {
    length = capsules.length - 1
  } else {
    length = capsules.length
    lastKey = null
  }
  // parent loop
  const callers = capsules.reverse().map((parentKey, index) => {
    audios = []
    capsule = []
    if (index < length) {
      // capsule loop
      Object.values(capPush[parentKey].audios).forEach((audio) => {
        audios = [...audios, {
          active: false,
          parentKey,
          id: audio.id,
          name: audio.audioName,
          length: audio.length,
          url: audio.url,
          likeCounter: audio.likeCounter || 0,
          audioIsGood: audio.audioIsGood
        }]
      })

      capsule = [
        ...capsule,
        {
          title: capPush[parentKey].title,
          audios
        }
      ]

      return put({type: 'STORE_CAPSULE_AUDIOS', payload: capsule})
    }
  })
  yield all(callers)
  yield put({type: 'LOAD_CP_AUDIO_SUCCESS'})
  yield put({type: 'CP_LASTKEY', payload: { lastKey }})
}

/**
 * watchers
 */
function * capsuleSaga () {
  yield takeLatest(capsuleTypes.LOADING_CP, loadCapsules)
}

export default [
  fork(capsuleSaga)
]
