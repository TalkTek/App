import {
  fork,
  call,
  put,
  all,
  takeLatest
} from 'redux-saga/effects'
// import CapsuleModule from '../../api/capsuleModule'
// import DownloadModule from '../../api/downloadModule'
import downloadAPI from '../download/downloadAPI'
import capsuleAPI from './capsuleAPI'
import {
  LOAD_CP_AUDIO_SUCCESS,
  CP_AUDIO_STORE
} from '../audio/audioTypes.js'
import {
  CAPSULE_SET_LASTKEY,
  LOAD_CP_AUDIO
} from './capsuleTypes.js'
import deepAssign from 'deep-assign'
/**
 * subroutines
 */

function * loadCapsules ({payload}) {
  let { lastKey, limitToLast } = payload
  let capsules
  let downloadedCapsules = yield call(downloadAPI.getDownloadedCapsules)
  let remoteCapsules = {}

  if (lastKey) {
    capsules = yield call(capsuleAPI.loadLimitWithLastKey, limitToLast + 1, lastKey)
  } else {
    capsules = yield call(capsuleAPI.loadLimit, limitToLast + 1)
    // try {
    //   remoteCapsules = yield new Promise((resolve, reject) => {
    //     let status = false
    //     capsuleAPI.loadLimit(limitToLast + 1).then((remoteCapsules) => {
    //       status = true
    //       resolve(remoteCapsules)
    //     })
    //     setTimeout(() => {
    //       if (!status) {
    //         reject(null)
    //       }
    //     }, 5000)
    //   })
    // } catch (e) {
    //   console.log('yoooo')
    // }
    // console.log(capsules)
  }
  // capsules = deepAssign(remoteCapsules, downloadedCapsules)
  for (let parentKey in capsules) {
    for (let childkey in capsules[parentKey].audios) {
      let isdownloaded = yield call(downloadAPI.getDownloadedCapsulesID, childkey)
      capsules[parentKey].audios[childkey] = {
        ...capsules[parentKey].audios[childkey],
        // some properties that should be handled by local
        active: false,
        downloaded: isdownloaded
        // some properties that should be handled by local
      }
    }
  }
  yield put({type: CP_AUDIO_STORE, payload: capsules})
  // capsules = Object.keys(capPush)
  // lastKey = capsules[0]
  //
  // if (capsules.length === limitToLast + 1) {
  //   length = capsules.length - 1
  // } else {
  //   length = capsules.length
  //   lastKey = null
  // }
  // // parent loop
  // const callers:[] = capsules.reverse().map((parentKey, index) => {
  //   audios = []
  //   capsule = []
  //   if (index < length) {
  //     // capsule loop
  //     Object.values(capPush[parentKey].audios).forEach((audio) => {
  //       audios = [...audios, {
  //         active: false,
  //         parentKey,
  //         id: audio.id,
  //         name: audio.audioName,
  //         length: audio.length,
  //         url: audio.url,
  //         likeCounter: audio.likeCounter || 0,
  //         audioIsGood: audio.audioIsGood
  //       }]
  //     })
  //
  //     capsule = [
  //       ...capsule,
  //       {
  //         title: capPush[parentKey].title,
  //         audios
  //       }
  //     ]
  //
  //     return put({type: CP_AUDIO_STORE, payload: capsule})
  //   }
  // })
  // yield all(callers)
  yield put({type: LOAD_CP_AUDIO_SUCCESS})
  // yield put({type: CAPSULE_SET_LASTKEY, payload: { lastKey }})
}

/**
 * watchers
 */
function * capsuleSaga () {
  yield takeLatest(LOAD_CP_AUDIO, loadCapsules)
}

export default [
  fork(capsuleSaga)
]
