import {
  handleActions
} from 'redux-actions'

const initMemberState = {
  avatarUrl: null,
  email: null,
  name: null,
  uid: null,
  from: null,
  birthday: null,
  gender: null,
  favoriteCapsule: []
}

export default handleActions({
  'CHANGE_MEMBER_STATE': (memberState, action) => {
    return {
      ...memberState,
      avatarUrl: action.payload.avatarUrl,
      email: action.payload.email,
      name: action.payload.name,
      uid: action.payload.uid,
      from: action.payload.from,
      birthday: action.payload.birthday,
      gender: action.payload.gender
    }
  },
  'LOGOUT_MEMBER': (memberState) => {
    return initMemberState
  },
  'SAVE_MEMBER_CHANGE': (memberState, action) => {
    return { 
      ...memberState, 
      avatarUrl: action.payload.avatarUrl || memberState.avatarUrl,
      email: action.payload.email || memberState.email,
      name: action.payload.name || memberState.name,
      birthday: action.payload.birthday || memberState.birthday,
      gender: action.payload.gender || memberState.gender
    }
  },
  'MEMBER_CAPSULE_GET_SUCCESS': (memberState, action) => {
    // console.log(action)
    return {
      ...memberState,
      favoriteCapsule: action.payload.capsules
    }
  }
}, initMemberState)
