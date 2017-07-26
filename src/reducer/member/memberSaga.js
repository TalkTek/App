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

function * getMemberCapsule(data) {
  let capsules = yield call(() => new MemberModule().getLikeCapsule(data.payload))
  yield put({
    type: 'MEMBER_CAPSULE_GET_SUCCESS',
    payload: {
      capsules
    }
  })
}

/**
 * watcher
 */

function * member() {
  yield takeLatest(MemberTypes.MEMBER_CAPSULE_GET, getMemberCapsule)
}

export default [
  fork(member)
]