import { 
  fork, 
  take,
  call 
} from 'redux-saga/effects'
import AudioAction from './audioAction'

/**
 * watcher
 */
function* getLikeCount() {
  // yield takeLatest('')
  // yield call(null, () => console.log('got Audio Info'))
}

export default [
  fork(getLikeCount)
]
