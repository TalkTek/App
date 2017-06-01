// @flow
import { StackNavigator } from 'react-navigation'
import TalkListScreen from '../../screens/talkList'
import TalkContentScreen from '../../screens/talkContent'
import Login from '../../screens/loginOrRegister/login'
import Register from '../../screens/loginOrRegister/register'
import MainScreen from '../../screens/Main'

export const AppNavigator = StackNavigator({
  TalkList: { screen: TalkListScreen },
  TalkContent: { screen: TalkContentScreen },
  Login: { screen: Login },
  Register: { screen: Register },
  Main: { screen: MainScreen }
}, {
  initialRouteName: 'Main',
  navigationOptions: {
    title: 'talk',
    headerStyle: {
      backgroundColor: 'rgb(31, 191, 179)',
      height: 64
    },
    headerTitleStyle: {
      fontSize: 17,
      lineHeight: 22,
      color: 'rgb(255, 255, 255)'
    },
    headerBackTitle: 'back',
    headerBackTitleStyle: {
      fontSize: 15,
      fontWeight: 'bold',
      lineHeight: 22,
      color: 'rgb(255, 255, 255)'
    },
    headerTintColor: 'white'
  }
})

export default AppNavigator
