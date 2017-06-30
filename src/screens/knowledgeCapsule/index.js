// @flow
'use strict'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import * as globalActions from '../../reducer/global/globalAction'
import { connect } from 'react-redux'
import {
  TouchableHighlight,
  Animated,
  Dimensions,
} from 'react-native'
import {
  Container,
  Content,
  View,
  Text,
} from 'native-base'

import firebase from 'firebase'
import AudioUnit from '../../components/AudioUnit'
import Player from 'react-native-audio-toolkit'

const { width : screenWidth, height: screenHeight } = Dimensions.get('window')

console.log('screenHeight', screenHeight);

const mapStateToProps = (state) => {
  return {
    playing: state.playing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(dispatch, globalActions)
  }
}

class KnowledgeCapsule extends Component {

  state = {
    popoutAudioBarHeight: new Animated.Value(screenHeight),
    audioPopBarOpen: false,
  }


  componentWillMount () {
    // get back data from firebase
    // let capsuleRef = firebase.database().ref('capsule').limitToLast(10)
    // capsuleRef
    //   .once('value', (snapshot) => {
    //     console.log('value is', snapshot.val())
    //   })
    //   .catch(error => console.warn('error: get capsule data from firebase. message is: ', error))
    // create audio player
    this.player = null
  }

  createPlayer = () => {
    if (this.player) {
      this.player.destroy()
    }
  }

  togglePlayAudioBar = () => {
    const { popoutAudioBarHeight } = this.state
    // popoutAudioBarHeight.setValue(screenHeight)

    Animated.spring(
      popoutAudioBarHeight,
      {
        toValue: screenHeight - 160
      }
    ).start()
  }
  

  render () {


    return (
      <Container style={styles.container}>
        <Content>
          <TouchableHighlight
            onPress={this.togglePlayAudioBar}
            underlayColor="#fff"
          >
            <Text>Press Me</Text>
          </TouchableHighlight>
          <Animated.View
            style={[styles.popoutAudioPlayBar, {top: this.state.popoutAudioBarHeight} ]}
          >
            <TouchableHighlight
            >
              <Text>Hello world</Text>
            </TouchableHighlight>
          </Animated.View>
        </Content>
      </Container>
    )
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
  },
  popoutAudioPlayBar: {
    position: 'absolute',
    width: screenWidth,
    height: 48,
    backgroundColor: 'rgb(245, 245, 245)'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KnowledgeCapsule)
