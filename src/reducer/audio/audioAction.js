import {
  createActions
} from 'redux-actions'

import {
  CP_AUDIO_GOOD_CHANGE,
  LOAD_CP_AUDIO_SUCCESS,
  SHOW_AUDIO_POPOUT_BAR,
  HIDE_AUDIO_POPOUT_BAR,

  SET_LIKE_EVALUATION_ON_CAPSULE,
  SET_LIKE_EVALUATION_ON_CAPSULE_REQUEST,
  SET_LIKE_EVALUATION_ON_CAPSULE_SUCCESS,
  SET_LIKE_EVALUATION_ON_CAPSULE_FAILURE,

  REMOVE_LIKE_EVALUATION_ON_CAPSULE,
  REMOVE_LIKE_EVALUATION_ON_CAPSULE_REQUEST,
  REMOVE_LIKE_EVALUATION_ON_CAPSULE_SUCCESS,
  REMOVE_LIKE_EVALUATION_ON_CAPSULE_FAILURE,

  SET_EVALUATION,
  SET_EVALUATION_REQUEST,
  SET_EVALUATION_SUCCESS,
  SET_EVALUATION_FAILURE,

  PLAY,
  PLAY_REQUEST,
  PLAY_SUCCESS,
  PLAY_FAILURE,

  PAUSE,
  PAUSE_REQUEST,
  PAUSE_SUCCESS,
  PAUSE_FAILURE,

  NEXT,
  NEXT_REQUEST,
  NEXT_SUCCESS,
  NEXT_FAILURE,

  PREVIOUS,
  PREVIOUS_REQUEST,
  PREVIOUS_SUCCESS,
  PREVIOUS_FAILURE,

  FORWARD_15,
  FORWARD_15_REQUEST,
  FORWARD_15_SUCCESS,
  FORWARD_15_FAILURE,

  BACKWARD_15,
  BACKWARD_15_REQUEST,
  BACKWARD_15_SUCCESS,
  BACKWARD_15_FAILURE,

  SEEK,
  SEEK_REQUEST,
  SEEK_SUCCESS,
  SEEK_FAILURE,

  TIMER,
  TIMER_REQUEST,
  TIMER_SUCCESS,
  TIMER_FAILURE,

  UPDATE_CURRENT_TIME,
  UPDATE_CURRENT_TIME_REQUEST,
  UPDATE_CURRENT_TIME_SUCCESS,
  UPDATE_CURRENT_TIME_FAILURE,

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

  SET_AUDIO_SOURCE,
  SET_AUDIO_SOURCE_REQUEST,
  SET_AUDIO_SOURCE_SUCCESS,
  SET_AUDIO_SOURCE_FAILURE
} from './audioTypes.js'

export default createActions({
  [LOAD_CP_AUDIO_SUCCESS]: state => state,
  [SHOW_AUDIO_POPOUT_BAR]: state => state,
  [HIDE_AUDIO_POPOUT_BAR]: state => state,

  [SET_EVALUATION]: (isPositive, capsuleId, parentKey, memberUid) => ({
    isPositive,
    capsuleId,
    parentKey,
    memberUid
  }),
  [SET_EVALUATION_REQUEST]: state => state,
  [SET_EVALUATION_SUCCESS]: (isPositive) => ({
    isPositive
  }),
  [SET_EVALUATION_FAILURE]: state => state,

  [SET_LIKE_EVALUATION_ON_CAPSULE]: state => state,
  [SET_LIKE_EVALUATION_ON_CAPSULE_REQUEST]: state => state,
  [SET_LIKE_EVALUATION_ON_CAPSULE_SUCCESS]: state => state,
  [SET_LIKE_EVALUATION_ON_CAPSULE_FAILURE]: state => state,

  [REMOVE_LIKE_EVALUATION_ON_CAPSULE]: state => state,
  [REMOVE_LIKE_EVALUATION_ON_CAPSULE_REQUEST]: state => state,
  [REMOVE_LIKE_EVALUATION_ON_CAPSULE_SUCCESS]: state => state,
  [REMOVE_LIKE_EVALUATION_ON_CAPSULE_FAILURE]: state => state,

  [PLAY]: state => state,
  [PLAY_REQUEST]: state => state,
  [PLAY_SUCCESS]: state => state,
  [PLAY_FAILURE]: state => state,

  [PAUSE]: state => state,
  [PAUSE_REQUEST]: state => state,
  [PAUSE_SUCCESS]: state => state,
  [PAUSE_FAILURE]: state => state,

  [NEXT]: state => state,
  [NEXT_REQUEST]: state => state,
  [NEXT_SUCCESS]: state => state,
  [NEXT_FAILURE]: state => state,

  [PREVIOUS]: state => state,
  [PREVIOUS_REQUEST]: state => state,
  [PREVIOUS_SUCCESS]: state => state,
  [PREVIOUS_FAILURE]: state => state,

  [FORWARD_15]: state => state,
  [FORWARD_15_REQUEST]: state => state,
  [FORWARD_15_SUCCESS]: state => state,
  [FORWARD_15_FAILURE]: state => state,

  [BACKWARD_15]: state => state,
  [BACKWARD_15_REQUEST]: state => state,
  [BACKWARD_15_SUCCESS]: state => state,
  [BACKWARD_15_FAILURE]: state => state,

  [SEEK]: state => state,
  [SEEK_REQUEST]: state => state,
  [SEEK_SUCCESS]: state => state,
  [SEEK_FAILURE]: state => state,

  [TIMER]: state => state,
  [TIMER_REQUEST]: state => state,
  [TIMER_FAILURE]: state => state,
  [TIMER_SUCCESS]: state => state,

  [UPDATE_CURRENT_TIME]: state => state,
  [UPDATE_CURRENT_TIME_REQUEST]: state => state,
  [UPDATE_CURRENT_TIME_FAILURE]: state => state,
  [UPDATE_CURRENT_TIME_SUCCESS]: state => state,

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

  [ON_PRESS]: (parentKey, childKey, audiosource) => ({
    parentKey,
    childKey,
    audiosource
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
  [SAVE_PLAYING_AUDIO_DYNAMIC_CNFO_FAILURE]: state => state,

  [SET_AUDIO_SOURCE]: state => state,
  [SET_AUDIO_SOURCE_REQUEST]: state => state,
  [SET_AUDIO_SOURCE_SUCCESS]: state => state,
  [SET_AUDIO_SOURCE_FAILURE]: state => state
})
