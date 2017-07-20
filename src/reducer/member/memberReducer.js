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
      ...action.payload 
    }
  },
  'LOGOUT_MEMBER': (memberState) => {
    return initMemberState
  }
}, initMemberState)
