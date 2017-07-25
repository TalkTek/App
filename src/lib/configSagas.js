import { all } from 'redux-saga/effects'
import AudioSaga from '../reducer/audio/audioSaga'

export default function * sagas() {
  yield all([
    ...AudioSaga
  ])
}
