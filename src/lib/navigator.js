// @flow

import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import TalkListScreen from '../screens/talkList/index'
import TalkContentScreen from '../screens/talkContent/index'
import Login from '../screens/loginOrRegister/login'
import Register from '../screens/loginOrRegister/register'
import MainScreen from '../screens/Main'
import KnowledgeCapsule from '../screens/knowledgeCapsule/index'
import MemberCenter from '../screens/memberCenter/index'
import { Platform, Image } from 'react-native'

const LectureScreen = StackNavigator({
  TalkList: { screen: TalkListScreen },
  TalkContent: { screen: TalkContentScreen },
  Login: { screen: Login },
  Register: { screen: Register },
  Main: { screen: MainScreen }
}, {
  initialRouteName: 'Main',
  navigationOptions: {
    title: '小講',
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

const CapsuleScreen = StackNavigator({
  KnowledgeCapsuleScreen: { screen: KnowledgeCapsule }
}, {
  navigationOptions: {
    title: '知識膠囊',
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

const MemberCenterScreen = StackNavigator({
  MemberCenterScreen: { screen: MemberCenter }
}, {
  navigationOptions: {
    title: '我的',
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
    // Lecture: {
    //   screen: LectureScreen,
    //   navigationOptions: {
    //     tabBarLabel: '小講',
    //     tabBarIcon: ({tintColor, focused}) => (
    //       <Image
    //         source={
    //           focused
    //             ? require('../../assets/img/tabIcon/lecture/lec_active.png')
    //             : require('../../assets/img/tabIcon/lecture/lec_inactive.png')
    //         }
    //       />
    //     )
    //   }
    // },
    KnowledgeCapsule: {
      screen: CapsuleScreen,
      navigationOptions: {
        tabBarLabel: '知識膠囊',
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={
              focused
                ? require('../assets/img/tabIcon/knowledgeCapsule/cap_active.png')
                : require('../assets/img/tabIcon/knowledgeCapsule/cap_inactive.png')
            }
          />
        )
      }
    },
    MemberCenter: {
      screen: MemberCenterScreen,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor, focused}) => (
          <Image
            source={
              focused
                ? require('../assets/img/tabIcon/memberCenter/member_active.png')
                : require('../assets/img/tabIcon/memberCenter/member_inactive.png')
            }
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? 'rgb(31, 191, 179)' : '#fff',
      style: {
        height: 49,
        backgroundColor: 'white',
        borderTopColor: 'rgb(224, 224, 224)',
        borderTopWidth: 1
      }
    }
  }
)

export default AppNavigator
