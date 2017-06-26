// @flow

import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import TalkListScreen from '../../screens/talkList'
import TalkContentScreen from '../../screens/talkContent'
import Login from '../../screens/loginOrRegister/login'
import Register from '../../screens/loginOrRegister/register'
import MainScreen from '../../screens/Main'
import KnowledgeCapsule from '../../screens/knowledgeCapsule'
import MemberCenter from '../../screens/memberCenter'
import { Platform, Image } from 'react-native'

const LectureScreen = StackNavigator({
  TalkList: { screen: TalkListScreen },
  TalkContent: { screen: TalkContentScreen },
  Login: { screen: Login },
  Register: { screen: Register },
  Main: { screen: MainScreen }
}, {
  initialRouteName: 'TalkList',
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

const AppNavigator = TabNavigator(
  {
    Lecture: {
      screen: LectureScreen,
      navigationOptions: {
        tabBarLabel: '小講',
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={
              focused
                ? require('../../assets/img/tabIcon/lecture/lec_active.png')
                : require('../../assets/img/tabIcon/lecture/lec_inactive.png')
            }
          />
        )
      }
    },
    KnowledgeCapsule: {
      screen: KnowledgeCapsule,
      navigationOptions: {
        tabBarLabel: '知識膠囊',
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={
              focused
                ? require('../../assets/img/tabIcon/knowledgeCapsule/cap_active.png')
                : require('../../assets/img/tabIcon/knowledgeCapsule/cap_inactive.png')
            }
          />
        )
      }
    },
    MemberCenter: {
      screen: MemberCenter,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={
              focused
                ? require('../../assets/img/tabIcon/memberCenter/member_active.png')
                : require('../../assets/img/tabIcon/memberCenter/member_inactive.png')
            }
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff'
    }
  }
)

export default AppNavigator
