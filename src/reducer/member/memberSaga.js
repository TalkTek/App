import {
  takeLatest,
  fork,
  call,
  put
} from 'redux-saga/effects'
import MemberTypes from './memberTypes'
import MemberModule from '../../api/memberModule'

/**
 * subroutines
 */

function * getMemberCapsule (data) {
  let capsules = yield call(() => new MemberModule().getLikeCapsule(data.payload))
  yield put({
    type: 'MEMBER_CAPSULE_GET_SUCCESS',
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
    type: 'SEND_FEEDBACK_SUCCESS',
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
  yield put({ type: 'CHANGE_MEMBER_STATE', payload: Object.assign(post, {uid}) })
}

function * createMember ({ payload: {email, password} }) {
  // cteate member
  let res = yield call(() => new MemberModule().registerMember(email, password))
  if (res.code) {
    yield put({type: 'CREATE_MEMBER_FAIL', payload: res})
  } else {
    yield put({type: 'CREATE_MEMBER_SUCCESS'})
  }
}

function * getMemberState ({ payload: { uid } }) {
  let member = yield call(() => new MemberModule().getMemberState(uid))
  yield put({type: 'CHANGE_MEMBER_STATE', payload: {...member, uid}})
}

/**
 * watcher
 */

function * member () {
  yield takeLatest(MemberTypes.GET_MEMBER_STATE, getMemberState)
  yield takeLatest(MemberTypes.CREATE_MEMBER, createMember)
  yield takeLatest(MemberTypes.LOGIN_MEMBER, loginMember)
  yield takeLatest(MemberTypes.LOGOUT_MEMBER, logoutMember)
  yield takeLatest(MemberTypes.MEMBER_CAPSULE_GET, getMemberCapsule)
  yield takeLatest(MemberTypes.SAVE_MEMBER_CHANGE, changeMember)
  yield takeLatest(MemberTypes.SEND_FEEDBACK, sendFeedBack)
}

export default [
  fork(member)
]
