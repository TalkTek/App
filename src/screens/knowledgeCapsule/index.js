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
import styles from './styles'
import { Player } from 'react-native-audio-toolkit'
import AudioUnit from '../../components/AudioUnit'
import WelcomeText from 'react-native/local-cli/templates/HelloNavigation/views/welcome/WelcomeText.android'
import ob from 'lodash/object'


const { width : screenWidth, height: screenHeight } = Dimensions.get('window')
console.log('screenHeight', screenHeight);
console.log('screenWidth', screenWidth);

let buttons = {
  'play': require('../../assets/img/audioElement/play.png'),
  'pause': require('../../assets/img/audioElement/pause.png'),
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

  player = null

  state = {
    popoutAudioBarHeight: new Animated.Value(screenHeight),
    audioPopBarOpen: false,
    capsuleData: null,
    audioUnit: [],
    player: null,
    audioName: null,
    audioLength: null,
    playPauseButton: true, //true mean playable
    lastPick: {
      i: null,
      j: null
    }
  }

  componentWillMount () {
    // get back data from firebase
    let capsuleRef = firebase.database().ref('capsules').limitToLast(10)
    let audios = []
    capsuleRef
      .once('value', snapshot => {
        console.log('sna', snapshot.val());
        Object.values(snapshot.val()).forEach(cap => {
          Object.values(cap.audios).forEach((audio) => {
            audios = [...audios, {
              active: false,
              name: audio.audioName,
              length: audio.length,
              url: audio.url
            }]
          })
          this.setState({
            audioUnit: [...this.state.audioUnit, {
              audios: audios,
              title: cap.title
            }]
          })
          audios = []
        })
      })
      .catch(error => console.warn('error: get capsule data from firebase. message is: ', error))
    // create audio player
  }

  createPlayer = (url) => {
    if(this.player) {
      this.player.destroy()
    }
    this.player = new Player(url)
      .prepare(error => {
        if(error) {
          console.log('error at createPlayer, error is => ', error);
        }
      })
  }

  playOrPause = () => {
    this.player.playPause((error, playing) => {
      if(error) {
        console.log('playPause error msg is', error);
      }
      this.setState({
        playPauseButton: this.player && !playing
      })
    })
  }


  togglePlayAudioBar = (audio, i, j) => {
    const { popoutAudioBarHeight, audioUnit, lastPick } = this.state
    
    console.log('audioUnitxxx', audioUnit);

    if(lastPick.i !== null && lastPick.j !== null) {
      audioUnit[lastPick.i].audios[lastPick.j].active = false
    }

    console.log('before change', audioUnit[i].audios[j].active  );

    audioUnit[i].audios[j].active = true

    this.setState({
      audioLength: audio.length,
      audioName: audio.name,
      lastPick: {
        i: i,
        j: j
      },
    })

    console.log('after change', audioUnit[i].audios[j].active  );

    this.createPlayer(audio.url)
    this.playOrPause()

    Animated.spring(
      popoutAudioBarHeight,
      {
        toValue: screenHeight - 160
      }
    ).start()
  }

  render () {
    let CapUnit
    const {
      audioUnit,
      audioName,
      audioLength,
      playPauseButton
    } = this.state
    if(audioUnit) {
      CapUnit = audioUnit.map((cap, i) => {
        return (
          <View key={i} style={styles.capContainer}>
            <View style={styles.capTitle}>
              <Text style={styles.capTitleText}>
                {cap.title}
              </Text>
            </View>
            {
              cap.audios.map((audio, j) =>
                <View key={j} style={styles.capUnit}>
                  <TouchableHighlight
                    style={styles.capPlayPauseButton}
                    onPress={this.togglePlayAudioBar.bind(this, audio, i, j)}
                    underlayColor="#fff"
                  >
                    <View style={styles.capAudio}>
                      <Image
                        source={audio.active ? buttons.pause : buttons.play}
                        style={styles.capPlayPauseButtonImage}
                      />
                      <Text style={audio.active ? styles.capAudioTextPlaying : styles.capAudioTextNotPlaying}>{audio.name}</Text>
                      <Text style={styles.audioLengthText}>{audio.length}</Text>
                    </View>
                  </TouchableHighlight>
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
          <Animated.View
            style={[styles.popoutAudioPlayBar, {top: this.state.popoutAudioBarHeight} ]}
          >
            <TouchableHighlight
              transparent
              onPress={this.playOrPause}
            >
              <Image
                source={playPauseButton ? buttons.pause : buttons.play}
                style={styles.playPauseButton}
              />
            </TouchableHighlight>
            <View style={styles.popoutAudioBarDes}>
              <Text style={styles.popoutAudioBarText}>
                {audioName}
              </Text>
              <Text style={styles.popoutAudioBarNumber}>
                {audioLength}
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

export default connect(mapStateToProps, mapDispatchToProps)(KnowledgeCapsule)
