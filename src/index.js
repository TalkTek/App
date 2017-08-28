// @flow
'use strict'

import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './lib/configureStore'
import CodePush from 'react-native-code-push'
// import AudioComponents from './components/AudioComponents'
import AudioPlayerComponents from './components/AudioPlayerComponents'
import './lib/global'
import {
  StatusBar,
  View
} from 'react-native'
import {
  Router,
  Scene,
  Reducer
} from 'react-native-router-flux'

import Launch from './screens/Launch'
import MemberCenterTab from './screens/memberCenter/Tab'
import KnowledgeCapsuleTab from './screens/knowledgeCapsule/Tab'
import TaikContentTab from './screens/talkContent/Tab'
import Login from './screens/loginOrRegister/login'
import Register from './screens/loginOrRegister/register'
import ForgotPassword from './screens/loginOrRegister/forgetpw'
import PopOutBar from './components/PopOutBar'

class App extends Component {
  componentDidMount () {
    CodePush.sync({ installMode: CodePush.InstallMode.ON_NEXT_RESTART })
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
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle='light-content'
          />
          <Router createReducer={reducerCreate} tintColor='white'>
            <Scene overlay>
              <Scene
                key='popOutBar'
                component={PopOutBar}
                initial
              />
              <Scene key='modal' modal hideNavBar initial>
                <Scene
                  key='root'
                  hideNavBar
                  hideTabBar
                  initial
                >
                  <Scene
                    animationEnabled={false}
                    key='player'
                    replace
                    hideNavBar
                    component={AudioPlayerComponents}
                  />
                  <Scene
                    key='launch'
                    component={Launch}
                    initial
                    hideNavBar
                    hideTabBar
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
                    {TaikContentTab}
                    {KnowledgeCapsuleTab}
                    {MemberCenterTab}
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

let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START
}

App = CodePush(codePushOptions)(App)

export default App
