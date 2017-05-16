/**
 * Created by xiezirui on 2017/5/16.
 */
// @flow
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux';
import createStore from './lib/configureStore'
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import AppNav from './modules/navigator/navigator'

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

export default class App extends React.Component {
  render () {
    const store = createStore()
    return (
      <Provider store={store}>
        <AppWithNavState />
      </Provider>
    )
  }
}