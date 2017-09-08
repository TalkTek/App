// @flow
import {
  fork,
  call,
  select,
  take,
  put,
  cancelled
} from 'redux-saga/effects'
import {
  eventChannel,
  END
} from 'redux-saga'
import {
  CP_AUDIO_GOOD_CHANGE_SUCCESS,
  CP_AUDIO_GOOD_CHANGE_FAILURE,
  // --------R_START-------------
  ON_PRESS,
  PLAY,
  PAUSE,
  NEXT,
  PREVIOUS,
  FORWARD_15,
  BACKWARD_15,
  SEEK,
  SET_EVALUATION
} from './audioTypes'
import {
  getCapsule,
  getCapsules,
  getIsPlayedInfo,
  getAudioLengthBySec,
  getCurrentTimeSec,
  isPlaying,
  getCurrentKey,
  getPreviousKey,
  getLikeCounter,
  getMemberState
} from './audioSelector'
import audioActions from './audioAction'
import memberActions from '../member/memberAction'
import playerFactory from '../../factory/playerFactory'
import audioAPI from './audioAPI'
import memberAPI from '../member/memberAPI'

/**
 * set like to certain capsule on firebase
 * if successfully, add 1 from likeCounter in redux store
 * @param capsuleId
 * @param parentKey
 * string: eg: 'Ks7-sSKFSDFJKSDFKJKSF'
 */
function * setLikeOnCapsule (capsuleId, parentKey) {
  try {
    yield put(audioActions.setLikeEvaluationOnCapsuleRequest())
    const likeCounter = yield select(getLikeCounter())
    yield call(audioAPI.setLike, parentKey, capsuleId, likeCounter + 1)
    yield put(audioActions.setLikeEvaluationOnCapsuleSuccess())
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * add the audio's key info into favorite field of the member on firebase
 * if successfully, save the audio id into the member in redux store
 * @param capsuleId
 * @param parentKey
 * @param memberUid
 * string: eg: 'Ks7-sSKFSDFJKSDFKJKSF'
 */
function * setFavoriteCapsuleOnUser (capsuleId, parentKey, memberUid) {
  try {
    yield put(memberActions.setFavoriteCapsuleOnUserRequest())
    yield call(memberAPI.setFavoriteCapsule, memberUid, capsuleId, parentKey)
    yield put(memberActions.setFavoriteCapsuleOnUserSuccess(capsuleId, parentKey))
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * remove like to certain capsule on firebase
 * if successfully, subtract 1 from likeCounter in redux store
 * @param capsuleId
 * @param parentKey
 * string: eg: 'Ks7-sSKFSDFJKSDFKJKSF'
 */
function * removeLikeOnCapsule (capsuleId, parentKey) {
  try {
    yield put(audioActions.removeLikeEvaluationOnCapsuleRequest())
    const likeCounter = yield select(getLikeCounter())
    yield call(audioAPI.removeLike, parentKey, capsuleId, likeCounter - 1)
    yield put(audioActions.removeLikeEvaluationOnCapsuleSuccess())
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * remove the audio in favorite field of the member on firebase
 * if successfully, remove the audio id in the member in redux store
 * @param capsuleId
 * @param capsuleId
 * @param memberUid
 * string: eg: 'Ks7-sSKFSDFJKSDFKJKSF'
 */
function * removeFavoriteCapsuleOnUser (capsuleId, memberUid) {
  try {
    yield put(memberActions.removeFavoriteCapsuleOnUserRequest())
    yield call(memberAPI.removeFavoriteCapsule, memberUid, capsuleId)
    yield put(memberActions.removeFavoriteCapsuleOnUserSuccess(capsuleId))
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * it's a flow that get the next capsule info when user press next button
 * there are three different conditions will be happened
 * 1. the next child exist
 * 2. the next child not exist, but next parent exist
 * 3. the next child not exist, and the next parent not exist either
 * According to the above conditions, we use different ways to deal with that.
 */
function * getNextCapsuleFlow () {
  let capsule
  let nextKey
  const { parentKey, childKey } = yield select(getCurrentKey())

  try {
    if (nextKey = yield call(isNextChildExisted, parentKey, childKey)) {
      capsule = yield call(getCapsuleIfNextChildExisted, parentKey, nextKey)
    } else if (nextKey = yield call(isNextParentExisted, parentKey, childKey)) {
      capsule = yield call(getCapsuleIfNextParentExisted, nextKey)
    } else {
      capsule = yield call(getCurrentCapsule, parentKey, childKey)
    }
    return capsule
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * this function only use for the condition
 * that there are not parent and child for the audio
 * when user press "next" or "previous" button
 * meaning to say, the audio is the last or the start
 * @param parentKey
 * @param childKey
 * string, eg: '7w4SEKsFJLHKDKFJKLS'
 */
function * getCurrentCapsule (parentKey, childKey) {
  try {
    const capsule = yield select(getCapsule(parentKey, childKey))
    /**
     * {
     *  audioName: '',
     *  draft: '',
     *  id: '',
     *  length: {
     *    formatted: '',
     *    sec: '',
     *  },
     *  likeCounter: 0,
     *  parentKey: '',
     *  url: '',
     */
    return capsule
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * check if the next child exist or not
 * @param parentKey
 * @param childKey
 * string, eg: '7w4SEKsFJLHKDKFJKLS'
 */
function * isNextChildExisted (parentKey, childKey) {
  try {
    const capsules = yield select(getCapsules(parentKey))
    /**
     * capsules : object
     *  {
     *    -KsZqtddsDKLALWED': object,
     *    -KsZqtddsDKDASDWED': object,
     *    -KsZqtdDDSDKDASDED': {
     *      audioName: '',
     *      draft: '',
     *      id: '',
     *      length: {
     *        formatted: '',
     *        sec: '',
     *      },
     *      likeCounter: 0,
     *      parentKey: '',
     *      url: '',
     *  }
     */
    let pos = Object.keys(capsules).indexOf(childKey)
    return Object.keys(capsules)[pos + 1]
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * check if the next parent exist or not
 * @param parentKey
 * string, eg: '7w4SEKsFJLHKDKFJKLS'
 */
function * isNextParentExisted (parentKey) {
  try {
    const capsules = yield select(getCapsules())
    /**
     * capsules : object
     *  {
     *    -KsZqtddsDKLALWED': object,
     *    -KsZqtddsDKDASDWED': object,
     *    -KsZqtdDDSDKDASDED': {
     *      audios: {
     *       -KsZqtddsDKLALWED': object,
     *       -KsZqtddsDKDASDWED': object,
     *       -KsZqtddsDKDASDWED': {
     *          audioName: '',
     *          draft: '',
     *          id: '',
     *          length: {
     *          formatted: '',
     *          sec: '',
     *          },
     *          likeCounter: 0,
     *          parentKey: '',
     *          url: '',
     *        }
     *     }
     *  }
     */
    let pos = Object.keys(capsules).indexOf(parentKey)
    return Object.keys(capsules)[pos + 1]
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * get the next audio info
 * @param parentKey
 * @param nextKey : the next audio key
 * string, eg: '7w4SEKsFJLHKDKFJKLS'
 */
function * getCapsuleIfNextChildExisted (parentKey, nextKey) {
  try {
    const capsules = yield select(getCapsules(parentKey))
    /**
     * capsules : object
     *  {
     *    -KsZqtddsDKLALWED': object,
     *    -KsZqtddsDKDASDWED': object,
     *    -KsZqtdDDSDKDASDED': {
     *      audioName: '',
     *      draft: '',
     *      id: '',
     *      length: {
     *        formatted: '',
     *        sec: '',
     *      },
     *      likeCounter: 0,
     *      parentKey: '',
     *      url: '',
     *  }
     */
    return capsules[nextKey]
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * get the next audio info
 * @param nextKey : the next audio key
 * string, eg: '7w4SEKsFJLHKDKFJKLS'
 */
function * getCapsuleIfNextParentExisted (nextKey) {
  try {
    const capsules = yield select(getCapsules())
    const childKey = Object.keys(capsules[nextKey].audios)[0]
    /**
     * capsules : object
     *  {
     *    -KsZqtddsDKLALWED': object,
     *    -KsZqtddsDKDASDWED': object,
     *    -KsZqtdDDSDKDASDED': {
     *      audios: {
     *       -KsZqtddsDKLALWED': object,
     *       -KsZqtddsDKDASDWED': object,
     *       -KsZqtddsDKDASDWED': {
     *          audioName: '',
     *          draft: '',
     *          id: '',
     *          length: {
     *          formatted: '',
     *          sec: '',
     *          },
     *          likeCounter: 0,
     *          parentKey: '',
     *          url: '',
     *        }
     *     }
     *  }
     */
    return capsules[nextKey].audios[childKey]
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * it's a flow that get the previous capsule info when user press previous button
 * there are three different conditions will be happened
 * 1. the previous child exist
 * 2. the previous child not exist, but previous parent exist
 * 3. the previous child not exist, and the previous parent not exist either
 * According to the above conditions, we use different ways to deal with that.
 */
function * getPreviousCapsuleFlow () {
  let capsule
  let nextKey
  const { parentKey, childKey } = yield select(getCurrentKey())
  try {
    if (nextKey = yield call(isPreviousChildExisted, parentKey, childKey)) {
      capsule = yield call(getCapsuleIfPreviousChildExisted, parentKey, nextKey)
      /**
       * {
       *  audioName: '',
       *  draft: '',
       *  id: '',
       *  length: {
       *    formatted: '',
       *    sec: '',
       *  },
       *  likeCounter: 0,
       *  parentKey: '',
       *  url: '',
       */
    } else if ( nextKey = yield call(isPreviousParentExisted, parentKey, childKey)) {
      capsule = yield call(getCapsuleIfPreviousParentExisted, nextKey)
    } else {
      capsule = yield call(getCurrentCapsule, parentKey, childKey)
    }
    return capsule
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * get the next audio info
 * @param parentKey
 * @param nextKey : the next audio key
 * string, eg: '7w4SEKsFJLHKDKFJKLS'
 **/
function * getCapsuleIfPreviousChildExisted (parentKey, nextKey) {
  try {
    const capsules = yield select(getCapsules(parentKey))
    /**
     * capsules : object
     *  {
     *    -KsZqtddsDKLALWED': object,
     *    -KsZqtddsDKDASDWED': object,
     *    -KsZqtdDDSDKDASDED': {
     *      audioName: '',
     *      draft: '',
     *      id: '',
     *      length: {
     *        formatted: '',
     *        sec: '',
     *      },
     *      likeCounter: 0,
     *      parentKey: '',
     *      url: '',
     *  }
     */
    return capsules[nextKey]
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * get the previous audio capsule
 * @param nextParentKey : the next audio key
 * string, eg: '7w4SEKsFJLHKDKFJKLS'
 **/
function * getCapsuleIfPreviousParentExisted (nextParentKey) {
  try {
    const capsules = yield select(getCapsules(nextParentKey))
    /**
     * capsules : object
     *  {
     *    -KsZqtddsDKLALWED': object,
     *    -KsZqtddsDKDASDWED': object,
     *    -KsZqtdDDSDKDASDED': {
     *      audioName: '',
     *      draft: '',
     *      id: '',
     *      length: {
     *        formatted: '',
     *        sec: '',
     *      },
     *      likeCounter: 0,
     *      parentKey: '',
     *      url: '',
     *  }
     */
    const length = Object.keys(capsules).length - 1
    const childKey = Object.keys(capsules)[length]
    return capsules[childKey]
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * check if the previous child exist or not
 * @param parentKey
 * @param childKey : the next audio key
 * string, eg: '7w4SEKsFJLHKDKFJKLS'
 **/
function * isPreviousChildExisted (parentKey, childKey) {
  try {
    const capsules = yield select(getCapsules(parentKey))
    /**
     * capsules : object
     *  {
     *    -KsZqtddsDKLALWED': object,
     *    -KsZqtddsDKDASDWED': object,
     *    -KsZqtdDDSDKDASDED': {
     *      audioName: '',
     *      draft: '',
     *      id: '',
     *      length: {
     *        formatted: '',
     *        sec: '',
     *      },
     *      likeCounter: 0,
     *      parentKey: '',
     *      url: '',
     *  }
     */
    let pos = Object.keys(capsules).indexOf(childKey)
    return Object.keys(capsules)[pos - 1]
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * check if the previous parent exist or not
 * @param parentKey
 * string, eg: '7w4SEKsFJLHKDKFJKLS'
 **/
function * isPreviousParentExisted (parentKey) {
  try {
    const capsules = yield select(getCapsules())
    /**
     * capsules : object
     *  {
     *    -KsZqtddsDKLALWED': object,
     *    -KsZqtddsDKDASDWED': object,
     *    -KsZqtdDDSDKDASDED': {
     *      audios: {
     *       -KsZqtddsDKLALWED': object,
     *       -KsZqtddsDKDASDWED': object,
     *       -KsZqtddsDKDASDWED': {
     *          audioName: '',
     *          draft: '',
     *          id: '',
     *          length: {
     *          formatted: '',
     *          sec: '',
     *          },
     *          likeCounter: 0,
     *          parentKey: '',
     *          url: '',
     *        }
     *     }
     *  }
     */
    let pos = Object.keys(capsules).indexOf(parentKey)
    return Object.keys(capsules)[pos - 1]
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * multiple conditions will use this function, such as :
 * 1. press
 * 2. play
 * 3. stop
 * 4. seek
 * if audio state is playing, then it will call startTimer
 * otherwise, that mean user press the pause button, so we need to clear the timer
 * VERY CAREFULLY, the timer is a "GLOBAL VARIEABLE".
 * there are two sub function : startTimer and updateCurrentTimeEvent
 * startTimer clearly practice start a timer, it will produce a event to get the value(current time)
 * that constantly produced by updateCurrentTimeEvent until the End event was emitted.
 */
function * Timer () {
  try {
    yield put(audioActions.timerRequest())
    let isAudioPlaying = yield select(isPlaying())
    if ( isAudioPlaying ) {
      if (GLOBAL_AUDIO_TIMER) {
        GLOBAL_AUDIO_TIMER.close()
      }
      yield call(startTimer)
    } else {
      GLOBAL_AUDIO_TIMER.close()
    }
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * producing a "GLOBAL" eventEmitter called GLOBAL_AUDIO_TIMER,
 * and watch the feedback value, length
 * the feedback value produced by updateCurrentTimeEvent
 * and dispatch a action every time that startTimer get the length value.
 * the function, updateCurrentTImeEvent, will continue out the value until emitting END event take place
 */
function * startTimer () {

  let audioDuration = yield select(getAudioLengthBySec())
  GLOBAL_AUDIO_TIMER = yield call(updateCurrentTimeEvent, audioDuration)

  try {
    while (true) {
      let length = yield take(GLOBAL_AUDIO_TIMER)
      yield put(audioActions.updateCurrentTimeSuccess(length))
    }
  } catch (error) {
    throw new Error(error)
  } finally {
    if (yield cancelled()) {
      GLOBAL_AUDIO_TIMER.close()
    }
  }
}

/**
 * it's a eventEmitter function for timer,
 * @param durationSec : string , eg: '113'
 * @returns {Channel<any>}
 */
function updateCurrentTimeEvent (durationSec) {
  return eventChannel(emitter => {
    let length
    const t = setInterval(() => {
      length = playerFactory.currentTime()
      if (length.currentTimeSec < durationSec) {
        emitter(length)
      } else {
        emitter(END)
      }
    },400)

    // when the END event was emitted, unsubscrible will be called
    const unsubscribe = () => {
      clearInterval(t)
    }
    return unsubscribe
  })
}

/**
 *  past two parameters into this function, and get two states from redux store
 *  to recognize if the audio was pressed or not , if be pressed before, then
 *  remove the previous button color, so we need to previousKey of the audio.
 *  For coloring the new button, we need to currentKey of audio
 * @param parentKey : string
 * @param childKey : string
 * eg: -Ks7KSNKLADs32S
 */
function * updateButtonColor (parentKey, childKey) {
  try {
    /**
     * playedAudioInfo: object
     * eg: {
     *  active: '', // this is a abandon prop, we don't use that to do anything
     *  audioName: 'test'
     *  draft: '<p>test</p>'
     *  id: '-Ks8KN....JQ', <--this is childKey
     *  length: {
     *    formatted: '03:53',
     *    sec: '233',
     *  },
     *  likeCounter: 0,
     *  url: 'https://firebasestorage.googleapis.com/....',
     *  parentKey: '-Ks8NFRunciomingYJ...'
     */
    let isPlayed = yield select(getIsPlayedInfo())
    let previousKey = yield select(getPreviousKey())
    if (isPlayed) {
      yield put(audioActions.removeColorRequest())
      yield put(audioActions.removeColorSuccess({
        parentKey: previousKey.father,
        childKey: previousKey.child
      }))
      yield put(audioActions.addColorRequest())
      yield put(audioActions.addColorSuccess({parentKey, childKey}))
    } else {
      yield put(audioActions.addColorRequest())
      yield put(audioActions.addColorSuccess({parentKey, childKey}))
    }
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * get url and call initAndPlay function through the playFactory
 * it's important to note that the function focus on the event that
 * the audio is firstly loaded such as, onPress, next, previous.
 * But playFlow doesn't use this function, because playFlow only use for
 * the situation that user press play button after they press pause.
 * in this case, the audio is same.
 *
 * @param url : string
 * eg:
 * "https://firebasestorage.googlepis.com/dfkajlksfjkf...."
 */
function * playNewAudio (url) {
  try {
    yield put(audioActions.playRequest())
    yield playerFactory.initAndPlay(url)
    yield put(audioActions.playSuccess())
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * get the parentKey and childKey, according that,
 * we can get the specific capsule file we want
 *
 * @param parentKey : string
 * @param childKey : string
 * eg: Ks8Mn5r1iPn7FB8mLWI
 */
function * getAudioFilePicked (parentKey, childKey) {
  try {
    let capsule = yield select(getCapsule(parentKey, childKey))
    return capsule
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * get the parentKey and capsule that user pick, and save capsule's file info into store
 * @param capsule : object
 * eg : capsule {
 *  acitve: '',
 *  audioName: "柯文哲好棒棒",
 *  draft: "<p>柯文哲好棒棒</p>",
 *  id: "KJKDFJKSFJDddfdKK",
 *  length: {
 *    formatted: "01:01",
 *    sec: "123"
 *  },
 *  likeCounter: 0,
 *  url: "https://firebasestorage.googlepis.com/dfkajlksfjkf....",
 * }
 */
function * setCapsulePickedIntoReduxStore (capsule) {
  try {
    yield put(audioActions.savePlayingAudioStaticInfoRequest())
    yield put(audioActions.savePlayingAudioStaticInfoSuccess({capsule}))
  } catch (error) {
    // yield put(audioActions.savePlayingAudioStaticInfoFailure())
    throw new Error(error)
  }
}

/**
 * get ParentKey and childKey from the button that user now press
 * and save them into store
 * this function mainly use for update the color of button
 * @param parentKey : string
 * @param childKey : string
 * eg: '-Ks7SNKSFDKLLSDF'
 */
function * setKey (parentKey, childKey) {
  try {
    yield put(audioActions.savePreviousKeyRequest())
    yield put(audioActions.savePreviousKeySuccess(parentKey, childKey))
  } catch (error) {
    throw new Error(error.message)
  }
}

// -------------------------WATCHER START-------------------------------
function * onPressFlow () {
  while (true) {
    const {payload: {parentKey, childKey}} = yield take(ON_PRESS)
    yield put(audioActions.onPressRequest())
    let capsule = yield call(getAudioFilePicked, parentKey, childKey)
    yield call(setCapsulePickedIntoReduxStore, capsule)
    yield put(audioActions.showAudioPopoutBar())
    yield call(playNewAudio, capsule.url)
    yield call(updateButtonColor, parentKey, childKey)
    yield call(setKey, parentKey, childKey)
    yield fork(Timer)
    yield put(audioActions.onPressSuccess())
  }
}

function * playFlow () {
  while (true) {
    yield take(PLAY)
    yield put(audioActions.playRequest())
    yield playerFactory.play()
    yield put(audioActions.playSuccess())
    yield call(Timer)
  }
}

function * pauseFlow () {
  while (true) {
    yield take(PAUSE)
    yield put(audioActions.pauseRequest())
    yield playerFactory.pause()
    yield put(audioActions.pauseSuccess())
    yield call(Timer)
  }
}

function * seekFlow () {
  while (true) {
    const {payload: pos} = yield take(SEEK)
    yield put(audioActions.seekRequest())
    yield playerFactory.seek(pos)
    yield put(audioActions.seekSuccess())
  }
}

function * forward15Flow () {
  while (true) {
    yield take(FORWARD_15)
    yield put(audioActions.forward15Request())
    const currentTimeSec = yield select(getCurrentTimeSec())
    yield playerFactory.seek(currentTimeSec + 15)
    yield put(audioActions.forward15Success())
  }
}

function * backward15Flow () {
  while (true) {
    yield take(BACKWARD_15)
    yield put(audioActions.backward15Request())
    const currentTimeSec = yield select(getCurrentTimeSec())
    yield playerFactory.seek(currentTimeSec - 15)
    yield put(audioActions.backward15Success())
  }
}

function * nextFlow () {
  while (true) {
    yield take(NEXT)
    let capsule = yield call(getNextCapsuleFlow)
    yield call(setCapsulePickedIntoReduxStore, capsule)
    yield call(playNewAudio, capsule.url)
    yield call(updateButtonColor, capsule.parentKey, capsule.id)
    yield call(setKey, capsule.parentKey, capsule.id)
    yield fork(Timer)
    yield put(audioActions.nextSuccess())
  }
}

function * previousFlow () {
  while (true) {
    yield take(PREVIOUS)
    let capsule = yield call(getPreviousCapsuleFlow)
    yield call(setCapsulePickedIntoReduxStore, capsule)
    yield call(playNewAudio, capsule.url)
    yield call(updateButtonColor, capsule.parentKey, capsule.id)
    yield call(setKey, capsule.parentKey, capsule.id)
    yield fork(Timer)
    yield put(audioActions.previousSuccess())
  }
}

function * toggleLikeFlow () {
  while (true) {
    yield take(SET_EVALUATION)
    yield put(audioActions.setEvaluationRequest())
    const userInfo = yield select(getMemberState)
    const currentKey = yield select(getCurrentKey())
    let isLike = userInfo.favoriteCapsule[currentKey.childKey]

    // the capsule was not set Like before
    if (!isLike) {
      // set like on capsule on firebase , if successfully, will set likeCounter in audio in redux store
      yield call(setLikeOnCapsule, currentKey.childKey, currentKey.parentKey)
      // set favoriteCapsule on user on firebase , if successfully, will add new favorite capusle in member in redux store
      yield call(setFavoriteCapsuleOnUser, currentKey.childKey, currentKey.parentKey, userInfo.uid)
    } else {
      // remove like on capsule on firebase , if successfully, will set likeCounter in audio in redux store
      yield call(removeLikeOnCapsule, currentKey.childKey, currentKey.parentKey)
      // remove favoriteCapsule on user on firebase , if successfully, will add new favorite capusle in member in redux store
      yield call(removeFavoriteCapsuleOnUser, currentKey.childKey, userInfo.uid)
    }
    // update reducer's data: likeCounter
    yield put(audioActions.setEvaluationSuccess())
  }
}

// -------------------------WATCHER END-------------------------------

export default [
  fork(onPressFlow),
  fork(playFlow),
  fork(pauseFlow),
  fork(seekFlow),
  fork(forward15Flow),
  fork(backward15Flow),
  fork(nextFlow),
  fork(previousFlow),
  fork(toggleLikeFlow)
]
