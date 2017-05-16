// @flow
import { StackNavigator } from 'react-navigation';
import TalkListScreen from '../../screens/talkList'
import TalkContentScreen  from '../../screens/talkContent'
// import LoginScreen from '../../screens/auth/Login'
import MainScreen from '../../screens/Main'


export const AppNavigator = StackNavigator({
  TalkList: {screen: TalkListScreen,},
  TalkContent: { screen: TalkContentScreen },
  // Login: { screen: LoginScreen },
  Main: { screen: MainScreen },
},{
  initialRouteName: 'Main',
  navigationOptions: {
    title: 'talk',
    headerStyle: {
      backgroundColor: 'rgb(31, 191, 179)',
      height: 64,
    },
    headerTitleStyle: {
      fontSize: 17,
      lineHeight: 22,
      color: 'rgb(255, 255, 255)',
    },
    headerBackTitle: 'back',
    headerBackTitleStyle: {
      fontSize: 15,
      fontWeight: 'bold',
      lineHeight: 22,
      color: 'rgb(255, 255, 255)',
    },
    headerTintColor: 'white'
  }
})

export default AppNavigator


