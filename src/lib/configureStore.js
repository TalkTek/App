import { createStore, applyMiddleware, compose } from 'redux'
import { AsyncStorage } from 'react-native';
import middlewares, { sagaMiddlewares } from './middlewares'
import reducer from '../reducer/index'
import configSaga from './configSagas'

const enhancers = [
  applyMiddleware(...middlewares)
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(...enhancers)

function configureStore(onComplete: ?()=> void) {
  const store = createStore(reducer, undefined, enhancer)
  sagaMiddlewares.run(configSaga)
  return store
}

export default configureStore