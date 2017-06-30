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
  Image
} from 'react-native'
import {
  Container,
  Content,
  View,
  Text,
  Left,
  Right,
  Button,
} from 'native-base'

import firebase from 'firebase'
import AudioUnit from '../../components/AudioUnit'
import Player from 'react-native-audio-toolkit'
import WelcomeText from 'react-native/local-cli/templates/HelloNavigation/views/welcome/WelcomeText.android'

const { width : screenWidth, height: screenHeight } = Dimensions.get('window')

console.log('screenHeight', screenHeight);
console.log('screenWidth', screenWidth);

let buttons = {
  'play': require('../../assets/img/audioElement/play.png'),
  'stop': require('../../assets/img/audioElement/pause.png'),
  'close': require('../../assets/img/close.png')
}

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
    popoutAudioBarHeight: new Animated.Value(screenHeight-160),
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
            <Button
              transparent
            >
              <Image
                source={buttons.play}
                style={styles.playPauseButton}
              />
            </Button>
            <View style={styles.popoutAudioBarDes}>
              <Text style={styles.popoutAudioBarText}>
                別期待你的男人一心多用
              </Text>
              <Text style={styles.popoutAudioBarNumber}>
                04:10
              </Text>
            </View>
            <Button
            >
              <Image
                source={buttons.close}
                style={styles.open}
              />
            </Button>
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
    backgroundColor: 'rgb(245, 245, 245)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  playPauseButton: {
    width: 32,
    height: 32,
  },
  popoutAudioBarDes: {
    width: screenWidth*0.68,
  },
  popoutAudioBarNumber: {
    fontSize: 10,
    color: 'rgb(33, 33, 33)'
  },
  popoutAudioBarText: {
    fontWeight: '900',
    fontSize: 13,
    color: 'rgb(33, 33, 33)'
  },
  open: {
    width: 20,
    height: 20,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(KnowledgeCapsule)
