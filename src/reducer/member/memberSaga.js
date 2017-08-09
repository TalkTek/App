import {
  takeLatest,
  fork,
  call,
  put
} from 'redux-saga/effects'
import {
  SEND_FEEDBACK_SUCCESS,
  SEND_RESET_PASSWORD_EMAIL,
  CHANGE_MEMBER_STATE,
  MEMBER_FAIL,
  MEMBER_SUCCESS,
  GET_MEMBER_STATE,
  CREATE_MEMBER,
  LOGIN_MEMBER,
  LOGIN_MEMBER_EMAIL,
  LOGOUT_MEMBER,
  MEMBER_CAPSULE_GET,
  MEMBER_CAPSULE_GET_SUCCESS,
  SAVE_MEMBER_CHANGE,
  SEND_FEEDBACK
} from './memberTypes'
import MemberModule from '../../api/memberModule'

/**
 * subroutines
 */

function * getMemberCapsule (data) {
  let capsules = yield call(() => new MemberModule().getLikeCapsule(data.payload))
  yield put({
    type: MEMBER_CAPSULE_GET_SUCCESS,
    payload: {
      capsules
    }
  })
}

function * changeMember ({ payload: {post, memberUid} }) {
  yield call(() => new MemberModule().changeMemberProfile(memberUid, post))
}

function * sendFeedBack ({ payload: { type, content, userId } }) {
  yield call(() => new MemberModule().sendFeedBack(type, content, userId))
  yield put({
    type: SEND_FEEDBACK_SUCCESS,
    payload: {}
  })
}

function * logoutMember () {
  new MemberModule().logoutMember().catch(err => {
    console.warn('[SignOut Error] Messages is', err.message)
  })
}

function * loginMember ({payload: { uid, post }}) {
  yield call(() => new MemberModule().writeProfile(uid, post))
  yield put({ type: CHANGE_MEMBER_STATE, payload: Object.assign(post, {uid}) })
}

function * createMember ({ payload: {email, password} }) {
  // cteate member
  let res = yield call(() => new MemberModule().registerMember(email, password))
  yield call(() => resStatus(res))
}

function * getMemberState ({ payload: { uid } }) {
  let member = yield call(() => new MemberModule().getMemberState(uid))
  yield put({type: CHANGE_MEMBER_STATE, payload: {...member, uid}})
}

function * loginMemberEmail ({ payload: {email, password} }) {
  let res = yield call(() => new MemberModule().loginMemberEmail(email, password))
  yield call(() => resStatus(res))
}

// control response status
function * resStatus (res = {}) {
  if (res.code) {
    yield put({type: MEMBER_FAIL, payload: res})
  } else {
    yield put({type: MEMBER_SUCCESS})
  }
}

function * resetMemberEmail ({ payload }) {
  let res = yield call(() => new MemberModule().sendResetPasswordEmail(payload))
  yield call(() => resStatus(res))
}

/**
 * watcher
 */

function * member () {
  yield takeLatest(SEND_RESET_PASSWORD_EMAIL, resetMemberEmail)
  yield takeLatest(GET_MEMBER_STATE, getMemberState)
  yield takeLatest(CREATE_MEMBER, createMember)
  yield takeLatest(LOGIN_MEMBER, loginMember)
  yield takeLatest(LOGIN_MEMBER_EMAIL, loginMemberEmail)
  yield takeLatest(LOGOUT_MEMBER, logoutMember)
  yield takeLatest(MEMBER_CAPSULE_GET, getMemberCapsule)
  yield takeLatest(SAVE_MEMBER_CHANGE, changeMember)
  yield takeLatest(SEND_FEEDBACK, sendFeedBack)
}

export default [
  fork(member)
]
