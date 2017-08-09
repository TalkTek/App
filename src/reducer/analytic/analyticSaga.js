import {
  fork,
  takeEvery
} from 'redux-saga/effects'
import {
  GA_SET_SCREEN,
  GA_SET_EVENT
} from './analyticTypes'
import Analytic from '../../api/lib/Analytic'

/**
 * subroutines
 */

function * setScreen ({ payload }) {
  console.log(payload)
  new Analytic().setScreen(payload)
}

function * setEvent ({ payload: { category, action, value } }) {
  console.log(category, action, value)
  new Analytic().track(category, action, value)
}

/**
 * watcher
 */

function * analyticSaga () {
  yield takeEvery(GA_SET_SCREEN, setScreen)
  yield takeEvery(GA_SET_EVENT, setEvent)
}

export default [
  fork(analyticSaga)
]
