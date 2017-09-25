// @flow
import {
  takeLatest,
  fork,
  call,
  put,
  take
} from 'redux-saga/effects'
import {
  SEND_FEEDBACK_SUCCESS,
  SEND_FEEDBACK_FAILURE,
  SEND_RESET_PASSWORD_EMAIL,
  CHANGE_MEMBER_STATE,
  MEMBER_FAIL,
  MEMBER_SUCCESS,
  GET_MEMBER_INFO,
  GET_MEMBER_STATE_SUCCESS,
  GET_MEMBER_STATE_FAILURE,
  CREATE_MEMBER,
  LOGIN_MEMBER,
  LOGIN_MEMBER_EMAIL,
  LOGOUT_MEMBER,
  MEMBER_CAPSULE_GET,
  MEMBER_CAPSULE_GET_SUCCESS,
  SAVE_MEMBER_CHANGE,
  SEND_FEEDBACK
} from './memberTypes'
import MemberAPI from './memberAPI'

/**
 * subroutines
 */

function * changeMember ({ payload: {post, memberUid} }) {
  yield call(() => MemberAPI.changeMemberProfile(memberUid, post))
}


// control response status
function * resStatus (res = {}) {
  if (res.code) {
    yield put({type: MEMBER_FAIL, payload: res})
  } else {
    yield put({type: MEMBER_SUCCESS})
  }
}

/**
 * watcher
 */
function * getMemberInfo () {
  while (true) {
    let { payload: { uid } } = yield take(GET_MEMBER_INFO)
    let member = yield call(() => MemberAPI.getMemberInfo(uid))
    if (member) {
      // yield put({type: CHANGE_MEMBER_STATE, payload: {...member, uid}})
      yield put({type: GET_MEMBER_STATE_SUCCESS, payload: {...member, uid}})
    } else {
      yield put({ type: GET_MEMBER_STATE_FAILURE })
    }
  }
}

function * createMemberFlow () {
  while (true) {
    const { payload: { email, password } } = yield take(CREATE_MEMBER)
    let res = yield call(MemberAPI.registerMember, email, password)
    yield call(() => resStatus(res))
  }
}

function * loginMemberFlow () {
  while (true) {
    const {payload} = yield take(LOGIN_MEMBER)
    const {post, uid} = payload
    yield call(() => MemberAPI.setMemberInfo(uid, post))
  }
}

function * loginMemberEmailFlow () {
  while (true) {
    const { payload: {email, password} } = yield take(LOGIN_MEMBER_EMAIL)
    let res = yield call(MemberAPI.loginMemberEmail, email, password)
    yield call(resStatus, res)
  }
}

function * logoutMemberFlow () {
  while (true) {
    yield take(LOGOUT_MEMBER)
    MemberAPI.logoutMember().catch((err: Object):void => {
      console.warn('[SignOut Error] Messages is', err.message)
    })
  }
}

function * saveMemberChangeFlow () {
  while (true) {
    const {payload: {post, memberUid}} = yield take(SAVE_MEMBER_CHANGE)
    yield call(() => MemberAPI.changeMemberProfile(memberUid, post))
  }
}

function * sendFeedBackFlow () {
  while (true) {
    const {payload: {type, content, userId}} = yield take(SEND_FEEDBACK)
    console.log(type, content, userId)
    let res:Object|null = yield call(() => MemberAPI.sendFeedBack(type, content, userId))
    let key:string
    if (res) {
      key = SEND_FEEDBACK_FAILURE
    } else {
      key = SEND_FEEDBACK_SUCCESS
    }
    yield put({
      type: key,
      payload: {}
    })
  }
}

function * sendResetPasswordEmail () {
  while (true) {
    let {payload} = yield take(SEND_RESET_PASSWORD_EMAIL)
    let res = yield call(() => MemberAPI.sendResetPasswordEmail(payload))
    yield call(() => resStatus(res))
  }
}

export default [
  fork(createMemberFlow),
  fork(getMemberInfo),
  fork(createMemberFlow),
  fork(loginMemberFlow),
  fork(loginMemberEmailFlow),
  fork(logoutMemberFlow),
  fork(saveMemberChangeFlow),
  fork(sendFeedBackFlow),
  fork(sendResetPasswordEmail)
]

export {
  createMemberFlow,
  loginMemberEmailFlow,
  resStatus
}
