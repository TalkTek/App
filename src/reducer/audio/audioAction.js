import {
  createActions
} from 'redux-actions'
import firebase from 'firebase'
import AudioModule from '../../api/audioModule'

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
  'CP_AUDIO_GOOD_CHANGE': (isGood, capsulesId, parentKey, userId) => ({
    isGood,
    capsulesId,
    parentKey,
    userId
  }),
  'CP_AUDIO_GOOD_CHANGE_SUCCESS': state => state,
  'CP_AUDIO_INFO_GET': state => state,
  'CP_AUDIO_INFO_GET_SUCCESS': state => state
})
