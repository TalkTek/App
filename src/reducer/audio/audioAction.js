import {
  createActions
} from 'redux-actions'

import {
  CP_AUDIO_INFO_GET,
  CP_AUDIO_INFO_GET_SUCCESS,
  CP_AUDIO_GOOD_CHANGE,
  CP_AUDIO_GOOD_CHANGE_SUCCESS,
  CP_AUDIO_GET_DOC,
  CP_AUDIO_GET_DOC_SUCCESS,
  CHANGE_PLAYING_STATE,
  CP_AUDIO_STORE,
  SETTING_PLAYING_AUDIO_INFO,
  LOAD_CP_AUDIO_SUCCESS,
  TOGGLE_AUDIO_POPOUT_BAR
} from './audioTypes.js'

export default createActions({
  [CHANGE_PLAYING_STATE]: playState => playState,
  [CP_AUDIO_STORE]: audios => audios,
  [SETTING_PLAYING_AUDIO_INFO]: (
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
  [LOAD_CP_AUDIO_SUCCESS]: state => state,
  [CP_AUDIO_GOOD_CHANGE]: (isGood, capsulesId, parentKey, userId) => ({
    isGood,
    capsulesId,
    parentKey,
    userId
  }),
  [CP_AUDIO_GOOD_CHANGE_SUCCESS]: state => state,
  [CP_AUDIO_INFO_GET]: state => state,
  [CP_AUDIO_INFO_GET_SUCCESS]: state => state,
  [CP_AUDIO_GET_DOC]: state => state,
  [CP_AUDIO_GET_DOC_SUCCESS]: state => state,
  [TOGGLE_AUDIO_POPOUT_BAR]: state => state
})
