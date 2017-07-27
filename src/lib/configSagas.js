import { all } from 'redux-saga/effects'
import AudioSaga from '../reducer/audio/audioSaga'
import MemberSaga from '../reducer/member/memberSaga'

export default function * sagas() {
  yield all([
    ...AudioSaga,
    ...MemberSaga
  ])
}
