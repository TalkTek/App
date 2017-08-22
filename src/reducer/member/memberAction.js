import {
  createActions
} from 'redux-actions'
import {
  GET_MEMBER_INFO,
  CHANGE_MEMBER_STATE,
  LOGOUT_MEMBER,
  LOGIN_MEMBER,
  LOGIN_MEMBER_EMAIL,
  CREATE_MEMBER,
  MEMBER_FAIL,
  MEMBER_SUCCESS,
  SAVE_MEMBER_CHANGE,
  MEMBER_CAPSULE_GET,
  MEMBER_CAPSULE_GET_SUCCESS,
  SEND_FEEDBACK,
  SEND_FEEDBACK_SUCCESS,
  SEND_RESET_PASSWORD_EMAIL
} from './memberTypes.js'

export default createActions({
  [GET_MEMBER_INFO]: state => state,
  [CHANGE_MEMBER_STATE]: memberState => memberState,
  [LOGOUT_MEMBER]: state => state,
  [LOGIN_MEMBER]: state => state,
  [LOGIN_MEMBER_EMAIL]: state => state,
  [CREATE_MEMBER]: state => state,
  [MEMBER_FAIL]: state => state,
  [MEMBER_SUCCESS]: state => state,
  [SAVE_MEMBER_CHANGE]: memberState => memberState,
  [MEMBER_CAPSULE_GET]: state => state,
  [MEMBER_CAPSULE_GET_SUCCESS]: state => state,
  [SEND_FEEDBACK]: state => state,
  [SEND_FEEDBACK_SUCCESS]: state => state,
  [SEND_RESET_PASSWORD_EMAIL]: email => email
})
