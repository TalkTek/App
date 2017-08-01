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
  favoriteCapsule: [],
  sendStatus: 0 // 0 finish, 1 pending
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
    console.log(action.payload)
    return {
      ...memberState,
      avatarUrl: action.payload.post.avatarUrl || memberState.avatarUrl,
      email: action.payload.post.email || memberState.email,
      name: action.payload.post.name || memberState.name,
      birthday: action.payload.post.birthday || memberState.birthday,
      gender: action.payload.post.gender || memberState.gender
    }
  },
  'MEMBER_CAPSULE_GET_SUCCESS': (memberState, action) => {
    // console.log(action)
    return {
      ...memberState,
      favoriteCapsule: action.payload.capsules
    }
  },
  'SEND_FEEDBACK': (memberState, action) => ({
    ...memberState,
    sendStatus: 1
  }),
  'SEND_FEEDBACK_SUCCESS': (memberState, action) => ({
    ...memberState,
    sendStatus: 0
  })
}, initMemberState)
