// @flow
import {
  CHANGE_MEMBER_STATE,
  LOGOUT_MEMBER,
  SAVE_MEMBER_CHANGE,
  SEND_FEEDBACK,
  SEND_FEEDBACK_SUCCESS,
  MEMBER_FAIL,
  MEMBER_SUCCESS,
  MEMBER_STATE_GET_SUCCESS,
  SET_FAVORITE_CAPSULE_ON_USER_SUCCESS,
  REMOVE_FAVORITE_CAPSULE_ON_USER_SUCCESS,
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
  favoriteCapsule: Object,
  sendStatus: number,
  sendMsg: {
    code: string,
    message: string
  }
}
const initMemberState : MemberStateType = {
  avatarUrl: '',
  email: '',
  name: '',
  uid: null,
  from: '',
  birthday: '',
  gender: '',
  favoriteCapsule: {},
  sendStatus: 0, // 0 finish, 1 pending, 2 fail
  sendMsg: {code: '', message: ''}
}

export default createReducder({
  [SET_FAVORITE_CAPSULE_ON_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      favoriteCapsule: {
        ...state.favoriteCapsule,
        [action.payload.capsuleId]: {
          parentKey: action.payload.parentKey
        }
      }
    }
  },
  [REMOVE_FAVORITE_CAPSULE_ON_USER_SUCCESS]: (state, action) => {
    let newFavoriteCapsule = state.favoriteCapsule
    delete newFavoriteCapsule[action.payload.capsuleId]
    return {
      ...state,
      favoriteCapsule: newFavoriteCapsule,
    }
  },
  [CHANGE_MEMBER_STATE]: (memberState :MemberStateType, action: {payload: MemberStateType}) => {
    return {
      ...memberState,
      avatarUrl: action.payload.profile.avatarUrl,
      email: action.payload.profile.email,
      name: action.payload.profile.name,
      uid: action.payload.uid,
      favoriteCapsule: action.payload.favorite || {}
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
  [MEMBER_STATE_GET_SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      favoriteCapsule: payload.favorite||{},
      ...payload.profile,
      uid: payload.uid
    }
  },
  [MEMBER_SUCCESS]: (state: MemberStateType) => ({
    ...state,
    sendStatus: 0,
    sendMsg: {
      code: null,
      message: null
    }
  })
}, initMemberState)
