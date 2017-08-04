import {
  createActions
} from 'redux-actions'

/*eslint-disable*/
const {
  CP_AUDIO_INFO_GET,
  CP_AUDIO_INFO_GET_SUCCESS,
  CP_AUDIO_GOOD_CHANGE,
  CP_AUDIO_GOOD_CHANGE_SUCCESS,
  CP_AUDIO_GET_DOC,
  CP_AUDIO_GET_DOC_SUCCESS,
  CHANGE_PLAYING_STATE,
  STORE_CAPSULE_AUDIOS,
  SETTING_PLAYING_AUDIO_INFO,
  LOAD_CP_AUDIO_SUCCESS,
} = require('./audioTypes').default
/*eslint-disable*/

export default createActions({
  CHANGE_PLAYING_STATE: playState => playState,
  STORE_CAPSULE_AUDIOS: audios => audios,
  SETTING_PLAYING_AUDIO_INFO: (
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
  LOAD_CP_AUDIO_SUCCESS: state => state,
  CP_AUDIO_GOOD_CHANGE: (isGood, capsulesId, parentKey, userId) => ({
    isGood,
    capsulesId,
    parentKey,
    userId
  }),
  CP_AUDIO_GOOD_CHANGE_SUCCESS: state => state,
  CP_AUDIO_INFO_GET: state => state,
  CP_AUDIO_INFO_GET_SUCCESS: state => state,
  CP_AUDIO_GET_DOC: state => state,
  CP_AUDIO_GET_DOC_SUCCESS: state => state,
  TOGGLE_AUDIO_POPOUT_BAR: state => state
})
