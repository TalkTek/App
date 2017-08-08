import {
  createActions
} from 'redux-actions'

export default createActions({
  'GET_MEMBER_STATE': state => state,
  'CHANGE_MEMBER_STATE': memberState => memberState,
  'LOGOUT_MEMBER': state => state,
  'LOGIN_MEMBER': state => state,
  'CREATE_MEMBER': state => state,
  'CREATE_MEMBER_FAIL': state => state,
  'CREATE_MEMBER_SUCCESS': state => state,
  'SAVE_MEMBER_CHANGE': memberState => memberState,
  'MEMBER_CAPSULE_GET': state => state,
  'MEMBER_CAPSULE_GET_SUCCESS': state => state,
  'SEND_FEEDBACK': state => state,
  'SEND_FEEDBACK_SUCCESS': state => state
})
