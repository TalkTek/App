import createSaga from 'redux-saga'
import { createLogger } from 'redux-logger'

const sagaMiddlewares = createSaga()
const loggerMiddlewares = createLogger({
  predicate: () => __DEV__,
  collapsed: true,
  duration: true,
})

const middlewares = [
  sagaMiddlewares,
  loggerMiddlewares,
]

export { 
  sagaMiddlewares, 
  middlewares as default
}
