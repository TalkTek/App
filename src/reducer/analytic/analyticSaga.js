import {
  fork,
  takeEvery
} from 'redux-saga/effects'
import analyticTypes from './analyticTypes'

/**
 * subroutines
 */

function * setScreen (screen) {
  console.log(screen)
}

function * setEvent ({ payload: { category, action, value } }) {
  console.log(category, action, value)
}

/**
 * watcher
 */

function * analyticSaga () {
  yield takeEvery(analyticTypes.GA_SET_SCREEN, setScreen)
  yield takeEvery(analyticTypes.GA_SET_EVENT, setEvent)
}

export default [
  fork(analyticSaga)
]
