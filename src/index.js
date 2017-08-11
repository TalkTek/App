// @flow
'use strict'

import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import createStore from './lib/configureStore'
import { addNavigationHelpers } from 'react-navigation'
import AppNav from './lib/navigator'
import CodePush from 'react-native-code-push'
import AudioComponents from './components/AudioComponents'
import './lib/global'
import {
  StatusBar,
  Image,
  View
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
import Login from './screens/loginOrRegister/login'
import Register from './screens/loginOrRegister/register'
import ForgotPassword from './screens/loginOrRegister/forgetpw'
import PopOutBar from './components/PopOutBar'
import MessageBar from './components/MessageBar'

// @connect(state => ({
//   nav: state.nav
// }))
// class AppWithNavState extends Component {
//   render() {
//     return (
//       <AppNav
//         navigation={
//           addNavigationHelpers({
//             dispatch: this.props.dispatch,
//             state: this.props.nav,
//             _onPress: this.props._onPress,
//             _toggleAudioBarDown: this.props._toggleAudioBarDown,
//             _toggleAudioBarUp: this.props._toggleAudioBarUp
//           })
//         }
//       />
//     )
//   }
// }

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

// const TabIcon = (props) => {
//   console.log('TabIcon props is', props)
//   return (
//     <Image
//       source={
//         props.selected
//           ? TabIconLink.active.knowledgeCapsule
//           : TabIconLink.inActive.knowledgeCapsule
//       }
//     />
//   )
// }

class App extends React.Component {

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
          <Router createReducer={reducerCreate}>
            <Scene overlay>
              <Scene
                key='popOutBar'
                component={PopOutBar}
              />
              <Scene key='modal' modal hideNavBar initial>
              <Scene
                key='root'
                hideNavBar
                hideTabBar
              >
                {/*<Scene*/}
                  {/*hideNavBar*/}
                  {/*hideTabBar*/}
                  {/*key='popOutBar'*/}
                  {/*component={PopOutBar}*/}
                {/*/>*/}
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
                  navigationBarStyle={{
                    height: 49,
                    backgroundColor: 'white',
                    borderTopColor: 'rgb(224, 224, 224)',
                    borderTopWidth: 1
                  }}
                >
                  <Scene
                    key='knowledgeCapsule'
                    icon={(props) => {
                      return (
                        <Image
                          source={
                            props.selected
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
                    />
                  </Scene>
                  <Scene
                    key='memberCenter'
                    icon={(props) => {
                      return (
                        <Image
                          source={
                            props.selected
                              ? TabIconLink.active.memberCenter
                              : TabIconLink.inActive.memberCenter
                          }
                        />
                      )
                    }}
                  >
                    <Scene
                      initial
                      key='memberCenterList'
                      component={MemberCenter}
                    />
                    <Scene
                      key='memberInfo'
                      component={MemberInfo}
                      back
                    />
                    <Scene
                      key='feedback'
                      component={FeedBack}
                      back
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

let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START
}

App = CodePush(codePushOptions)(App)

export default App

