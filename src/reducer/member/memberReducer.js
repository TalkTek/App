// @flow
import {
  CHANGE_MEMBER_STATE,
  LOGOUT_MEMBER,
  SAVE_MEMBER_CHANGE,
  MEMBER_CAPSULE_GET_SUCCESS,
  SEND_FEEDBACK,
  SEND_FEEDBACK_SUCCESS,
  MEMBER_FAIL,
  MEMBER_SUCCESS
} from './memberTypes.js'
import createReducder from '../../lib/configureReducer'

type MemberStateType = {
  avatarUrl?: string|null,
  email?: string|null,
  name?: string|null,
  uid?: string|null,
  from?: string|null,
  birthday?: string|null,
  gender?: string|null,
  favoriteCapsule: Array<string>,
  sendStatus: number,
  sendMsg: {
    code: string,
    message: string
  }
}
const initMemberState : MemberStateType = {
  avatarUrl: null,
  email: null,
  name: null,
  uid: null,
  from: null,
  birthday: null,
  gender: null,
  favoriteCapsule: [],
  sendStatus: 0, // 0 finish, 1 pending, 2 fail
  sendMsg: {code: '', message: ''}
}

export default createReducder({
  [CHANGE_MEMBER_STATE]: (memberState :MemberStateType, action: {payload: MemberStateType}) => {
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
  [LOGOUT_MEMBER]: (memberState: MemberStateType) => {
    return initMemberState
  },
  [SAVE_MEMBER_CHANGE]: (memberState: MemberStateType, action: { payload: {post: MemberStateType} }) => {
    // console.log(action.payload)
    return {
      ...memberState,
      avatarUrl: action.payload.post.avatarUrl || memberState.avatarUrl,
      email: action.payload.post.email || memberState.email,
      name: action.payload.post.name || memberState.name,
      birthday: action.payload.post.birthday || memberState.birthday,
      gender: action.payload.post.gender || memberState.gender
    }
  },
  [MEMBER_CAPSULE_GET_SUCCESS]: (memberState: MemberStateType, action: {payload: {capsules: []}}) => {
    // console.log(action)
    return {
      ...memberState,
      favoriteCapsule: action.payload.capsules
    }
  },
  [SEND_FEEDBACK]: (memberState: MemberStateType) => ({
    ...memberState,
    sendStatus: 1
  }),
  [SEND_FEEDBACK_SUCCESS]: (memberState: MemberStateType) => ({
    ...memberState,
    sendStatus: 0
  }),
  [MEMBER_FAIL]: (state: MemberStateType, action: { payload: {code: '', message: ''} }) => ({
    ...state,
    sendStatus: 2,
    sendMsg: {
      code: action.payload.code,
      message: action.payload.message
    }
  }),
  [MEMBER_SUCCESS]: (state: MemberStateType) => ({
    ...state,
    sendStatus: 0,
    sendMsg: {
      code: null,
      message: null
    }
  })
}, initMemberState)
