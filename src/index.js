// @flow
'use strict'

import React, { Component } from 'react'
import { Provider, connect } from 'react-redux';
import createStore from './lib/configureStore'
import { addNavigationHelpers } from 'react-navigation';
import AppNav from './lib/navigator'
import CodePush from 'react-native-code-push'

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
            state: this.props.nav
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
        <AppWithNavState />
      </Provider>
    )
  }
}

let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START
}

App = CodePush(codePushOptions)(App)

export default App
