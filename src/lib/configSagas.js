import { all } from 'redux-saga/effects'
import AudioSaga from '../reducer/audio/audioSaga'
import MemberSaga from '../reducer/member/memberSaga'
import AnalyticSaga from '../reducer/analytic/analyticSaga'
import CapsuleSaga from '../reducer/capsule/capsuleSaga'

export default function * sagas () {
  yield all([
    ...AudioSaga,
    ...MemberSaga,
    ...AnalyticSaga,
    ...CapsuleSaga
  ])
}
