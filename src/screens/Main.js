// @flow
'use strict'

import React, { Component } from 'react'
import {
  Image,
} from 'react-native'
import { Container, View } from 'native-base'

import { NavigationActions } from 'react-navigation'


export default class Main extends Component {
  static navigationOptions ={
    header: null,
  }

  componentDidMount() {
    const { dispatch } = this.props.navigation
    setTimeout( () => dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'TalkList'})
        ]
      })
    ), 3000)
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.bg}>
          <Image source={require('../assets/img/logo.png')} style={styles.img}/>
        </View>
      </Container>
    )
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}