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
  CP_AUDIO_STORE,
  SETTING_PLAYING_AUDIO_INFO,
  LOAD_CP_AUDIO_SUCCESS,
  TOGGLE_AUDIO_POPOUT_BAR,
  SHOW_AUDIO_POPOUT_BAR,
  HIDE_AUDIO_POPOUT_BAR,
  AUDIO_LOAD,
  AUDIO_LOADED,
  AUDIO_PLAY,
  AUDIO_PAUSE,
  AUDIO_SEEK,
  AUDIO_TO_NEXT_TRACK,
  AUDIO_TO_PREVIOUS_TRACK,
  AUDIO_UPDATE_INFO,
  AUDIO_UPDATE_CURRENT_TIME,
  AUDIO_GET_NEXT_TRACK
} from './audioTypes.js'

export default createActions({
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
  [TOGGLE_AUDIO_POPOUT_BAR]: state => state,
  [SHOW_AUDIO_POPOUT_BAR]: state => state,
  [HIDE_AUDIO_POPOUT_BAR]: state => state,
  [AUDIO_LOAD]: state => state,
  [AUDIO_LOADED]: state => state,
  [AUDIO_PLAY]: state => state,
  [AUDIO_PAUSE]: state => state,
  [AUDIO_SEEK]: state => state,
  [AUDIO_TO_NEXT_TRACK]: state => state,
  [AUDIO_TO_PREVIOUS_TRACK]: state => state,
  [AUDIO_UPDATE_INFO]: state => state,
  [AUDIO_UPDATE_CURRENT_TIME]: state => state,
  [AUDIO_GET_NEXT_TRACK]: state => state,
})
