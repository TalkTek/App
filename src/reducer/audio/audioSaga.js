// @flow
import {
  fork,
  takeLatest,
  call,
  select,
  take,
  put,
  cancelled,
  cancel
} from 'redux-saga/effects'
import {
  eventChannel,
  END,
} from 'redux-saga'
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
  AUDIO_GET_PREVIOUS_TRACK,
  // --------R_START-------------
  ON_PRESS,
  ON_PRESS_REQUEST,
  ON_PRESS_SUCCESS,
  ON_PRESS_FAILURE,

  PLAY,
  PAUSE,
  NEXT,
  PREVIOUS,
  FORWARD_15,
  BACKWARD_15,
  SEEK,

} from './audioTypes'
import AudioModule from '../../api/audioModule'
import playerModule from '../../api/playerModule'
import {
  getCapsule,
  getCapsules,
  getIsPlayedInfo,
  getAudioLengthBySec,
  getCurrentTimeSec,
  isPlaying,
  getCurrentKey,
  getPreviousKey
} from './audioSelector'
import audioActions from './audioAction'
import playerFactory from '../../factory/playerFactory'
import analyticAction from '../analytic/analyticAction'

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

function * audioToNextTrack () {
  let capsule = yield call(() => selectTrack(+1))
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

function * audioSeek({ payload }) {
  let data = yield call(() => playerModule.seek(payload*1000))
}


function * getNextCapsuleFlow () {
  let capsule
  let nextKey
  const { parentKey, childKey } = yield select(getCurrentKey())

  try {
    if (nextKey = yield call(isNextChildExisted, parentKey, childKey)) {
      capsule = yield call(getCapsuleIfNextChildExisted, parentKey, nextKey)
    } else if ( nextKey = yield call(isNextParentExisted, parentKey, childKey)) {
      capsule = yield call(getCapsuleIfNextParentExisted, nextKey)
    } else {
      capsule = yield call(getCurrentCapsule, parentKey, childKey)
    }
    return capsule
  } catch (error) {
    throw new Error(error)
  }
}

function * getCurrentCapsule (parentKey, childKey) {
  try {
    const capsule = yield select(getCapsule(parentKey, childKey))
    return capsule
  } catch (error) {
    throw new Error(error)
  }
}

function * isNextChildExisted (parentKey, childKey) {
  try {
    const capsules = yield select(getCapsules(parentKey))
    let pos = Object.keys(capsules).indexOf(childKey)
    return Object.keys(capsules)[pos + 1]
  } catch (error) {
    throw new Error(error)
  }
}

function * isNextParentExisted (parentKey) {
  try {
    const capsules = yield select(getCapsules())
    let pos = Object.keys(capsules).indexOf(parentKey)
    return Object.keys(capsules)[pos+1]
  } catch (error) {
    throw new Error(error)
  }
}


function * getCapsuleIfNextChildExisted (parentKey ,nextKey) {
  try {
    const capsules = yield select(getCapsules(parentKey))
    return capsules[nextKey]
  } catch (error) {
    throw new Error(error)
  }
}

function * getCapsuleIfNextParentExisted (nextKey) {
  try {
    const capsules = yield select(getCapsules())
    return capsules[nextKey].audios[0]
  } catch (error) {
    throw new Error(error)
  }
}

function * getPreviousCapsuleFlow () {
  let capsule
  let nextKey
  const { parentKey, childKey } = yield select(getCurrentKey())
  try {
    if (nextKey = yield call(isPreviousChildExisted, parentKey, childKey)) {
      capsule = yield call(getCapsuleIfPreviousChildExisted, parentKey, nextKey)
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

function * getCapsuleIfPreviousChildExisted (parentKey, nextKey) {
  try {
    const capsules = yield select(getCapsules(parentKey))
    return capsules[nextKey]
  } catch (error) {
    throw new Error(error)
  }
}

function * getCapsuleIfPreviousParentExisted (nextParentKey) {
  try {
    const capsules = yield select(getCapsules(nextParentKey))
    const length = Object.keys(capsules).length -1
    const childKey = Object.keys(capsules)[length]
    return capsules[childKey]
  } catch (error) {
    throw new Error(error)
  }
}

function * isPreviousChildExisted (parentKey, childKey) {
  try {
    const capsules = yield select(getCapsules(parentKey))
    let pos = Object.keys(capsules).indexOf(childKey)
    return Object.keys(capsules)[pos - 1]
  } catch (error) {
    throw new Error(error)
  }
}

function * isPreviousParentExisted (parentKey) {
  try {
    const capsules = yield select(getCapsules())
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
  } catch( error) {
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
function * setCapsulePickedIntoReduxStore(capsule) {
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

//-------------------------WATCHER START-------------------------------
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
    const {payload: pos} =  yield take(SEEK)
    console.log('pos', pos)
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
//-------------------------WATCHER END-------------------------------

export default [
  fork(onPressFlow),
  fork(playFlow),
  fork(pauseFlow),
  fork(seekFlow),
  fork(forward15Flow),
  fork(backward15Flow),
  fork(nextFlow),
  fork(previousFlow)
]
