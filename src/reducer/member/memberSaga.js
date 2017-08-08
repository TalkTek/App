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

/**
 * watcher
 */

function * member () {
  yield takeLatest(MemberTypes.LOGOUT_MEMBER, logoutMember)
  yield takeLatest(MemberTypes.MEMBER_CAPSULE_GET, getMemberCapsule)
  yield takeLatest(MemberTypes.SAVE_MEMBER_CHANGE, changeMember)
  yield takeLatest(MemberTypes.SEND_FEEDBACK, sendFeedBack)
}

export default [
  fork(member)
]
