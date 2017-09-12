// @flow
'use strict'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import createStore from './lib/configureStore'
import CodePush from 'react-native-code-push'
import './lib/global'
import {
  StatusBar,
  View
} from 'react-native'
import {
  Router,
  Scene,
  Reducer,
  Overlay,
  Tabs,
  Modal,
  Stack,
  Lightbox
} from 'react-native-router-flux'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'
import Launch from './screens/Launch'
import PlayAudioScreen from './screens/playAudio'
import Login from './screens/loginOrRegister/login'
import Register from './screens/loginOrRegister/register'
import ForgotPassword from './screens/loginOrRegister/forgetpw'
import PopOutBar from './components/PopOutBar'
import KnowledgeCapsuleTab from './screens/knowledgeCapsule/Tab'
import MemberCenterTab from './screens/memberCenter/Tab'
import TalkContent from './screens/talkContent/Tab'

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
          <Router createReducer={reducerCreate}>
            <Overlay>
              <Modal
                hideNavBar
                transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forVertical })}
              >
                <Stack
                  key='root'
                  hideNavBar
                  hideTabBar
                >
                  <Scene
                    key='launch'
                    component={Launch}
                    initial
                  />
                  <Scene
                    key='login'
                    component={Login}
                  />
                  <Scene
                    key='forgetpw'
                    component={ForgotPassword}
                  />
                  <Scene
                    key='register'
                    component={Register}
                    back
                  />
                  <Tabs
                    key='tab'
                    tabBarStyle={{
                      height: 49,
                      backgroundColor: 'white',
                      borderTopColor: 'rgb(224, 224, 224)',
                      borderTopWidth: 1
                    }}
                    activeTintColor='rgb(31, 191, 179)'
                  >
                  {TalkContent}
                    {KnowledgeCapsuleTab}
                    {MemberCenterTab}
                  </Tabs>
                </Stack>
                <Scene
                  key='playAudioScreen'
                  component={PlayAudioScreen}
                />
              </Modal>
              <Scene
                key='popOutBar'
                component={PopOutBar}
              />
            </Overlay>
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
