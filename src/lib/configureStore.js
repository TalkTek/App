import { createStore, applyMiddleware, compose } from 'redux'
// import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import middlewares from './middlewares'
import reducer from '../modules/reducer'

const enhancers = [
  // autoRehydrate(),
  applyMiddleware(...middlewares)
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(...enhancers)

function configureStore(onComplete: ?()=> void) {
  const store = createStore(reducer, undefined, enhancer)
  // persistStore(store, {storage: AsyncStorage}, onComplete)
  // if(__DEV__) {
  //   window.store = store
  // }
  return store
}

export default configureStore