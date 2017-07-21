import {
  createActions
} from 'redux-actions'
import firebase from 'firebase'
import audioModule from './audioModule'

let audioLike = createActions({
  'CP_AUDIO_GOOD': async (capsulesId, parentKey, userId) => {
    let likeCounter = await audioModule.cpAudioGood(capsulesId, parentKey, userId)
    
    return {
      likeCounter
    }
  },
  'CP_AUDIO_NOT_GOOD': async (capsulesId, parentKey, userId) => {
    let likeCounter = await audioModule.cpAudioNotGood(capsulesId, parentKey, userId)

    return {
      likeCounter
    } 
  }
})

export default createActions({
  'CHANGE_PLAYING_STATE': playState => playState,
  'STORE_CAPSULE_AUDIOS': audios => audios,
  'SETTING_PLAYING_AUDIO_INFO': (
    name,
    length,
    currentTime,
    url,
    pos,
    from,
    id,
    parentKey,
    likeCounter
  ) => ({
    name,
    length,
    currentTime,
    url,
    pos,
    from,
    id,
    parentKey,
    likeCounter
  }),
  'LOAD_CP_AUDIO_SUCCESS': state => state,
  'CP_AUDIO_GOOD_CHECK': audioIsGood => ({ audioIsGood }),
  'CP_AUDIO_GOOD_CHANGE': (isGood, capsulesId, parentKey, userId) => {
    audioLike[isGood? 'cpAudioGood': 'cpAudioNotGood'](capsulesId, parentKey, userId)
    
    return {
      isGood
    }
  }
})
