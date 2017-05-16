import createSaga from 'redux-saga'
import { createLogger } from 'redux-logger'

const sagaMiddlewares = createSaga()
const loggerMiddlewares = createLogger({
  predicate: () => __DEV__,
  collapsed: true,
  duration: true,
})

export default [
  sagaMiddlewares,
  loggerMiddlewares,
]