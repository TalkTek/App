// @flow
'use strict'

import React, { Component } from 'react'
import { Provider, connect } from 'react-redux';
import createStore from './lib/configureStore'
import { addNavigationHelpers } from 'react-navigation';
import AppNav from './lib/navigator'
import CodePush from 'react-native-code-push'
import AudioComponents from './components/AudioComponents'
import './lib/global'
import { StatusBar } from 'react-native'

@connect(state => ({
  nav: state.nav
}))
class AppWithNavState extends Component {
  render() {
    return (
      <AppNav
        navigation={
          addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
            _onPress: this.props._onPress,
            _playOrPause: this.props._playOrPause,
            _forward: this.props._forward,
            _forward15s: this.props._forward15s,
            _backward: this.props._backward,
            _backward15s: this.props._backward15s,
            _seek: this.props._seek,
            _toggleAudioBarUp: this.props._toggleAudioBarUp,
            _toggleAudioBarDown: this.props._toggleAudioBarDown
          })
        }
      />
    )
  }
}

class App extends React.Component {

  componentDidMount() {
    CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESTART})
  }

  render () {
    const store = createStore()
    return (
      <Provider store={store}>
        <AudioComponents>
          <AppWithNavState/>
        </AudioComponents>
      </Provider>
    )
  }
}

let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START
}

App = CodePush(codePushOptions)(App)

export default App
