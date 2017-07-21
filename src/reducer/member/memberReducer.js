import {
  handleActions
} from 'redux-actions'

const initMemberState = {
  avatarUrl: null,
  email: null,
  name: null,
  uid: null
}

export default handleActions({
  'CHANGE_MEMBER_STATE': (memberState, action) => {
    return { 
      ...memberState, 
      avatarUrl: action.payload.avatarUrl,
      email: action.payload.email,
      name: action.payload.name,
      uid: action.payload.uid
    }
  },
  'LOGOUT_MEMBER': (memberState) => {
    return initMemberState
  }
}, initMemberState)
