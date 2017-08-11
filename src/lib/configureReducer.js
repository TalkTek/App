// @flow

const configureReducer = (handlers, initialState) => (state = initialState, action = {}) => {
  let finalState
  const handler = handlers[action.type]

  if (!handler) {
    return state
  }

  finalState = handler(state, action)
  return finalState
}

export default configureReducer
