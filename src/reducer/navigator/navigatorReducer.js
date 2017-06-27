// @flow
import AppNavigator from '../../lib/navigator'
import { NavigationActions } from 'react-navigation'

export default (state, action) => {

  let nextState

  switch (action.type) {
    case 'TalkContent':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'TalkContent' }), state)
      break
    default:
      nextState = AppNavigator.router.getStateForAction(action, state)
      break
  }

  return nextState || state
}
