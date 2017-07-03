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
  List,
  ListItem,
} from 'native-base'

import firebase from 'firebase'
import AudioUnit from '../../components/AudioUnit'
import Player from 'react-native-audio-toolkit'
import WelcomeText from 'react-native/local-cli/templates/HelloNavigation/views/welcome/WelcomeText.android'
import ob from 'lodash/object'

const { width : screenWidth, height: screenHeight } = Dimensions.get('window')

console.log('screenHeight', screenHeight);
console.log('screenWidth', screenWidth);

let buttons = {
  'play': require('../../assets/img/audioElement/play.png'),
  'stop': require('../../assets/img/audioElement/pause.png'),
  'expand': require('../../assets/img/knowledgeCapsule/expend.png')
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
    popoutAudioBarHeight: new Animated.Value(screenHeight),
    audioPopBarOpen: false,
    capsuleData: null,
    audioUnit: [],
  }

  componentWillMount () {
    // get back data from firebase
    let capsuleRef = firebase.database().ref('capsules').limitToLast(10)
    capsuleRef
      .once('value', snapshot => {
        console.log('sna', snapshot.val());
        Object.values(snapshot.val()).forEach(cap => {
          this.setState({
            audioUnit: [...this.state.audioUnit, {
              audios: cap.audios,
              title: cap.title
            }]
          })
        })
        console.log('audioUnit', this.state.audioUnit);
      })
      .catch(error => console.warn('error: get capsule data from firebase. message is: ', error))
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
    const { audioUnit } = this.state
    console.log('audioUnit ', this.state.audioUnit);
    let CapUnit
    if(audioUnit) {
      CapUnit = audioUnit.map((cap, i) => {
        console.log('cap is', cap);
        console.log('i is', i);
        return (
          <View key={i}>
            <Text>{cap.title}</Text>
            {
              Object.values(cap.audios).map( (audio, i) =>
                <View key={i*2}>
                  <Text>{audio.audioName}</Text>
                  <Text>{audio.length}</Text>
                </View>
              )
            }
          </View>
        )
      })
    }
    return (
      <Container style={styles.container}>
        <Content>
          <View
          >
            <Image
              style={styles.banner}
              source={require('../../assets/img/knowledgeCapsule/banner.png')}
            />
          </View>
          {CapUnit? CapUnit : <Text>123</Text>}

          {/*<TouchableHighlight*/}
            {/*onPress={this.togglePlayAudioBar}*/}
            {/*underlayColor="#fff"*/}
          {/*>*/}
            {/*<Text>Press Me</Text>*/}
          {/*</TouchableHighlight>*/}
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
              transparent
            >
              <Image
                source={buttons.expand}
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
  banner: {
    resizeMode: 'cover',
    width: screenWidth,
    height: 160
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
