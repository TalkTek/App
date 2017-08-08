// @flow
import AppNavigator from '../../lib/navigator'
import { NavigationActions } from 'react-navigation'

export default (state, action) => {
  let nextState

  switch (action.type) {
    case 'LOGOUT':
      console.log('state is', state)
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'Login' })
          ]
        }),
        state
      )
      return nextState
    default:
      nextState = AppNavigator.router.getStateForAction(action, state)
      break
  }

  return nextState || state
}
