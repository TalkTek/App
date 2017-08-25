import {
  createActions
} from 'redux-actions'

import {
  // CP_AUDIO_INFO_GET,
  // CP_AUDIO_INFO_GET_SUCCESS,
  CP_AUDIO_GOOD_CHANGE,
  // CP_AUDIO_GOOD_CHANGE_SUCCESS,
  // CP_AUDIO_GET_DOC,
  // CP_AUDIO_GET_DOC_SUCCESS,
  CP_AUDIO_STORE,
  // SETTING_PLAYING_AUDIO_INFO,
  LOAD_CP_AUDIO_SUCCESS,
  TOGGLE_AUDIO_POPOUT_BAR,
  SHOW_AUDIO_POPOUT_BAR,
  HIDE_AUDIO_POPOUT_BAR,
  // AUDIO_LOAD,
  AUDIO_LOADED,
  AUDIO_SEEK,
  AUDIO_TO_NEXT_TRACK,
  AUDIO_TO_PREVIOUS_TRACK,
  S_ON_PRESS_REQUEST,
  S_ON_PRESS_SUCCESS,
  S_ON_PRESS_FAILURE,
  // AUDIO_UPDATE_INFO,
  AUDIO_UPDATE_CURRENT_TIME,
  AUDIO_GET_NEXT_TRACK,
// --------R_START-------------

  REMOVE_COLOR,
  REMOVE_COLOR_REQUEST,
  REMOVE_COLOR_SUCCESS,
  REMOVE_COLOR_FAILURE,

  ADD_COLOR,
  ADD_COLOR_REQUEST,
  ADD_COLOR_SUCCESS,
  ADD_COLOR_FAILURE,

  AUDIO_PLAY,
  AUDIO_PLAY_REQUEST,
  AUDIO_PLAY_SUCCESS,
  AUDIO_PLAY_FAILURE,

  AUDIO_PAUSE,
  AUDIO_PAUSE_REQUEST,
  AUDIO_PAUSE_SUCCESS,
  AUDIO_PAUSE_FAILURE,

  ON_PRESS,
  ON_PRESS_REQUEST,
  ON_PRESS_SUCCESS,
  ON_PRESS_FAILURE,

  SAVE_PREVIOUS_KEY,
  SAVE_PREVIOUS_KEY_REQUEST,
  SAVE_PREVIOUS_KEY_SUCCESS,
  SAVE_PREVIOUS_KEY_FAILURE,

  SAVE_PLAYING_AUDIO_STATIC_INFO,
  SAVE_PLAYING_AUDIO_STATIC_INFO_REQUEST,
  SAVE_PLAYING_AUDIO_STATIC_INFO_SUCCESS,
  SAVE_PLAYING_AUDIO_STATIC_INFO_FAILURE,

  SAVE_PLAYING_AUDIO_DYNAMIC_INFO,
  SAVE_PLAYING_AUDIO_DYNAMIC_INFO_REQUEST,
  SAVE_PLAYING_AUDIO_DYNAMIC_INFO_SUCCESS,
  SAVE_PLAYING_AUDIO_DYNAMIC_CNFO_FAILURE,
} from './audioTypes.js'

export default createActions({
  [CP_AUDIO_STORE]: audios => audios,
  // [SETTING_PLAYING_AUDIO_INFO]: (
  //   name,
  //   length,
  //   currentTime,
  //   url,
  //   pos,
  //   from,
  //   id,
  //   parentKey,
  //   likeCounter
  // ) => ({
  //   name,
  //   length,
  //   currentTime,
  //   url,
  //   pos,
  //   from,
  //   id,
  //   parentKey,
  //   likeCounter
  // }),
  [LOAD_CP_AUDIO_SUCCESS]: state => state,
  [CP_AUDIO_GOOD_CHANGE]: (isGood, capsulesId, parentKey, userId) => ({
    isGood,
    capsulesId,
    parentKey,
    userId
  }),
  // [CP_AUDIO_GOOD_CHANGE_SUCCESS]: state => state,
  // [CP_AUDIO_INFO_GET]: state => state,
  // [CP_AUDIO_INFO_GET_SUCCESS]: state => state,
  // [CP_AUDIO_GET_DOC]: state => state,
  // [CP_AUDIO_GET_DOC_SUCCESS]: state => state,
  [TOGGLE_AUDIO_POPOUT_BAR]: state => state,
  [SHOW_AUDIO_POPOUT_BAR]: state => state,
  [HIDE_AUDIO_POPOUT_BAR]: state => state,
  // [AUDIO_LOAD]: state => state,
  [AUDIO_LOADED]: state => state,
  [AUDIO_PAUSE]: state => state,
  [AUDIO_SEEK]: state => state,
  [AUDIO_TO_NEXT_TRACK]: state => state,
  [AUDIO_TO_PREVIOUS_TRACK]: state => state,
  // [AUDIO_UPDATE_INFO]: state => state,
  [AUDIO_UPDATE_CURRENT_TIME]: state => state,
  [AUDIO_GET_NEXT_TRACK]: state => state,
  // ---------R_START-------------

  [SAVE_PREVIOUS_KEY]: state => state,
  [SAVE_PREVIOUS_KEY_REQUEST]: state => state,
  [SAVE_PREVIOUS_KEY_SUCCESS]: (parentKey, childKey) => ({
    parentKey,
    childKey
  }),
  [SAVE_PREVIOUS_KEY_FAILURE]: state => state,

  [REMOVE_COLOR]: state => state,
  [REMOVE_COLOR_FAILURE]: state => state,
  [REMOVE_COLOR_REQUEST]: state => state,
  [REMOVE_COLOR_SUCCESS]: state => ({
    parentKey: state.parentKey,
    childKey: state.childKey
  }),

  [ADD_COLOR]: state => state,
  [ADD_COLOR_FAILURE]: state => state,
  [ADD_COLOR_REQUEST]: state => state,
  [ADD_COLOR_SUCCESS]: state => ({
    parentKey: state.parentKey,
    childKey: state.childKey
  }),
  [AUDIO_PAUSE]: state => state,
  [AUDIO_PAUSE_REQUEST]: state => state,
  [AUDIO_PAUSE_SUCCESS]: state => state,
  [AUDIO_PAUSE_FAILURE]: state => state,

  [AUDIO_PLAY]: state => state,
  [AUDIO_PLAY_REQUEST]: state => state,
  [AUDIO_PLAY_SUCCESS]: state => state,
  [AUDIO_PLAY_FAILURE]: state => state,

  [ON_PRESS]: (parentKey, childKey) => ({
    parentKey,
    childKey
  }),
  [ON_PRESS_REQUEST]: state => state,
  [ON_PRESS_SUCCESS]: state => state,
  [ON_PRESS_FAILURE]: state => state,

  [SAVE_PLAYING_AUDIO_STATIC_INFO]: state => state,
  [SAVE_PLAYING_AUDIO_STATIC_INFO_REQUEST]: state => state,
  [SAVE_PLAYING_AUDIO_STATIC_INFO_SUCCESS]: state => state,
  [SAVE_PLAYING_AUDIO_STATIC_INFO_FAILURE]: state => state,

  [SAVE_PLAYING_AUDIO_DYNAMIC_INFO]: state => state,
  [SAVE_PLAYING_AUDIO_DYNAMIC_INFO_REQUEST]: state => state,
  [SAVE_PLAYING_AUDIO_DYNAMIC_INFO_SUCCESS]: state => state,
  [SAVE_PLAYING_AUDIO_DYNAMIC_CNFO_FAILURE]: state => state
})
