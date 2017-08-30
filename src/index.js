// @flow
'use strict'

import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './lib/configureStore'
import CodePush from 'react-native-code-push'
import './lib/global'
import {
  StatusBar,
  View,
  StyleSheet
} from 'react-native'
import {
  Router,
  Scene,
  Reducer
} from 'react-native-router-flux'

import Launch from './screens/Launch'
import KnowledgeCapsule from './screens/knowledgeCapsule'
import MemberCenter from './screens/memberCenter'
import MemberInfo from './screens/memberCenter/memberInfo'
import FeedBack from './screens/memberCenter/feedback'
import PlayAudioScreen from './screens/playAudio'
import Login from './screens/loginOrRegister/login'
import Register from './screens/loginOrRegister/register'
import ForgotPassword from './screens/loginOrRegister/forgetpw'
import PopOutBar from './components/PopOutBar'

import Icon from './components/img/icon/MediumIcon'

const TabIconLink = {
  active: {
    knowledgeCapsule: require('./assets/img/tabIcon/knowledgeCapsule/cap_active.png'),
    memberCenter: require('./assets/img/tabIcon/memberCenter/member_active.png')
  },
  inActive: {
    knowledgeCapsule: require('./assets/img/tabIcon/knowledgeCapsule/cap_inactive.png'),
    memberCenter: require('./assets/img/tabIcon/memberCenter/member_inactive.png')
  }
}

class App extends Component {
  componentDidMount () {
    CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESTART})
  }

  render () {
    const store = createStore()

    const reducerCreate = params => {
      const defaultReducer = new Reducer(params)
      return (state, action) => {
        console.log('ACTION:', action)
        return defaultReducer(state, action)
      }
    }

    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar
            barStyle='light-content'
          />
          <Router createReducer={reducerCreate} tintColor='white'>
            <Scene overlay>
              <Scene
                key='popOutBar'
                component={PopOutBar}
              />
              <Scene key='modal' hideNavBar initial>
                <Scene
                  key='root'
                  hideNavBar
                  hideTabBar
                  initial
                >
                  <Scene
                    key='launch'
                    component={Launch}
                    initial
                    hideNavBar
                    hideTabBar
                  />
                  <Scene
                    key='playAudioScreen'
                    hideNavBar
                    component={PlayAudioScreen}
                    direction='vertical'
                  />
                  <Scene
                    key='login'
                    component={Login}
                    hideNavBar
                  />
                  <Scene
                    key='register'
                    component={Register}
                    hideNavBar
                    back
                  />
                  <Scene
                    key='tab'
                    tabs
                    tabBarStyle={{
                      height: 49,
                      backgroundColor: 'white',
                      borderTopColor: 'rgb(224, 224, 224)',
                      borderTopWidth: 1
                    }}
                    activeTintColor='rgb(31, 191, 179)'
                  >
                    <Scene
                      key='knowledgeCapsule'
                      tabBarLabel='知識膠囊'
                      icon={(props) => {
                        return (
                          <Icon
                            source={
                              props.focused
                                ? TabIconLink.active.knowledgeCapsule
                                : TabIconLink.inActive.knowledgeCapsule
                            }
                          />
                        )
                      }}
                    >
                      <Scene
                        initial
                        key='knowledgeCapsuleList'
                        component={KnowledgeCapsule}
                        title='知識膠囊'
                        titleStyle={styles.titleStyle}
                        navigationBarStyle={styles.headerStyle}
                      />
                    </Scene>
                    <Scene
                      key='memberCenter'
                      tabBarLabel='我的'
                      icon={(props) => {
                        return (
                          <Icon
                            source={
                              props.focused
                                ? TabIconLink.active.memberCenter
                                : TabIconLink.inActive.memberCenter
                            }
                          />
                        )
                      }}
                      titleStyle={styles.titleStyle}
                      navigationBarStyle={styles.headerStyle}
                    >
                      <Scene
                        initial
                        key='memberCenterList'
                        component={MemberCenter}
                        title='我的'
                      />
                      <Scene
                        key='memberInfo'
                        component={MemberInfo}
                        back
                        title='個人資料'
                      />
                      <Scene
                        key='feedback'
                        component={FeedBack}
                        back
                        backTitle=''
                        title='意見反饋'
                      />
                    </Scene>
                  </Scene>
                </Scene>
              </Scene>
            </Scene>
          </Router>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'rgb(31, 191, 179)',
    height: 64
  },
  titleStyle: {
    color: 'white',
    fontSize: 17,
    lineHeight: 22
  }
})

let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START
}

App = CodePush(codePushOptions)(App)

export default App

