// @flow
'use strict'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import audioActions from '../../reducer/audio/audioAction'
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
  Footer,
} from 'native-base'
import firebase from 'firebase'
import styles from './styles'
import { Player } from 'react-native-audio-toolkit'

const { width : screenWidth, height: screenHeight } = Dimensions.get('window')
console.log('screenHeight', screenHeight);
console.log('screenWidth', screenWidth);

let buttons = {
  'playingOnAudioBar': require('../../assets/img/audioElement/play.png'),
  'playing': require('../../assets/img/audioElement/playing2.png'),
  'pause': require('../../assets/img/audioElement/pause.png'),
  'expand': require('../../assets/img/knowledgeCapsule/expend.png'),
  'playable': require('../../assets/img/audioElement/playing1.png')
}

const mapStateToProps = (state) => {
  return {
    playState: state.audio.playState,
    capsules: state.audio.capsules,
    audioName: state.audio.playingAudioInfo.audioName,
    audioLength: state.audio.playingAudioInfo.audioLength,
    audioUrl: state.audio.playingAudioInfo.audioUrl,
    audioPos: {
      i: state.audio.audioPos.i,
      j: state.audio.audioPos.j
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(audioActions, dispatch)
  }
}

class KnowledgeCapsule extends Component {

  player = null

  state = {
    popoutAudioBarHeight: new Animated.Value(screenHeight),
    offsetY: 0,
    audioBarActive: false,
    lastKey: null // firebase last key
  }

  componentWillMount () {
    // get back data from firebase
    let capsuleRef = firebase.database().ref('capsules').orderByKey().limitToLast(2)
    capsuleRef
      .on('child_added', (snapshot, prevChildKey) => {

        let audios = []
        let capsule = []
        let cap = snapshot.val()
        
        console.log('cap is', cap)

        this.setState({
          lastKey: prevChildKey
        })

        Object.values(cap.audios).forEach((audio) => {
          audios = [...audios, {
            active: false,
            name: audio.audioName,
            length: audio.length,
            url: audio.url
          }]
        })

        capsule = [
          ...capsule,
          {
            title: cap.title,
            audios
          }
        ]

        this.props.actions.storeCapsuleAudios(capsule)

        audios = []
        capsule = []
        // store knowledge audios into redux store
      })
  }

  createPlayer = (url) => {
    if(this.player) {
      this.player.destroy()
      this.props.actions.changePlayingState('notPlaying')
    }
    this.player = new Player(url)
      .prepare(error => {
        if(error) {
          console.log('error at createPlayer, error is => ', error);
        }
      })
  }

  forward = async () => {
    let next
    const { capsules, audioPos, actions } = this.props
    let pos = capsules[audioPos.i].audios.length

    if (audioPos.j + 1 < pos) {
      next = capsules[audioPos.i].audios[audioPos.j + 1]
      actions.settingPlayingAudioInfo(next.name, next.length, next.url)
      await this.toggleButtonColor(audioPos.i, audioPos.j + 1)
      await actions.settingNewAudioPos(audioPos.i, audioPos.j + 1)
      await this.createPlayer(next.url)
      await this.playOrPause()
    } else {
        if ( audioPos.i === capsules.length - 1) {
          // if audio reach end of audio's list, then recycle it
          next = capsules[0].audios[0]
          actions.settingPlayingAudioInfo(next.name, next.length, next.url)
          await this.toggleButtonColor(0, 0)
          await actions.settingNewAudioPos(0, 0)
          await this.createPlayer(next.url)
          await this.playOrPause()
        } else {
          next = capsules[audioPos.i + 1].audios[0]
          actions.settingPlayingAudioInfo(next.name, next.length, next.url)
          await this.toggleButtonColor(audioPos.i + 1, 0)
          await actions.settingNewAudioPos(audioPos.i + 1, 0)
          await this.createPlayer(next.url)
          await this.playOrPause()
        }
    }
  }

  backward = async () => {
    let next
    const { capsules, audioPos, actions } = this.props

    if(audioPos.j - 1 >= 0) {
      next = capsules[audioPos.i].audios[audioPos.j - 1]
      actions.settingPlayingAudioInfo(next.name, next.length, next.url)
      await this.toggleButtonColor(audioPos.i, audioPos.j -1)
      await actions.settingNewAudioPos(audioPos.i , audioPos.j -1)
      await this.createPlayer(next.url)
      await this.playOrPause()
    } else {
      if ( audioPos.i === 0) {
        // if audio reach Top of audio's list, then recycle it
        next = capsules[0].audios[0]
        actions.settingPlayingAudioInfo(next.name, next.length, next.url)
        await this.toggleButtonColor(0, 0)
        await actions.settingNewAudioPos(0, 0)
        await this.createPlayer(next.url)
        await this.playOrPause()
      } else {
        let maxLength = capsules[audioPos.i -1].audios.length - 1
        next = capsules[audioPos.i - 1].audios[maxLength]
        actions.settingPlayingAudioInfo(next.name, next.length, next.url)
        await this.toggleButtonColor(audioPos.i - 1, maxLength)
        await actions.settingNewAudioPos(audioPos.i - 1, maxLength)
        await this.createPlayer(next.url)
        await this.playOrPause()
      }
    }
  }

  playOrPause = () => {
    const { playState, actions } = this.props
    if(playState ==='notPlaying' && this.player) {
      actions.changePlayingState('playing')
      this.player.play()
    } else if (!this.player) {
      console.log('player is not found',);
    } else {
      actions.changePlayingState('notPlaying')
      this.player.pause()
    }
  }

  toggleButtonColor = (i, j) => {
    const { capsules, audioPos } = this.props
    if (audioPos.i !== '' && audioPos.j !== '') {
      capsules[audioPos.i].audios[audioPos.j].active = false
    }
    capsules[i].audios[j].active = true
  }

  onPressAudio = async (audio, i, j) => {
    const { audioPos } = this.props
    const { capsules, actions } = this.props

    actions.settingNewAudioPos(i, j)
    actions.settingPlayingAudioInfo(
      audio.name,
      audio.length,
      audio.url
    )
    
    this.setState({
      audioBarActive: true
    })

    await this.toggleButtonColor(i, j)
    await this.createPlayer(audio.url)
    await this.playOrPause()
    this.toggleAudioBarUp()

  }

  toggleAudioBarUp = () => {
    const { popoutAudioBarHeight } = this.state
    Animated.spring(
      popoutAudioBarHeight,
      {
        toValue: screenHeight - 160
      }
    ).start()
  }

  toggleAudioBarDown = () => {
    const { popoutAudioBarHeight } = this.state
    Animated.spring(
      popoutAudioBarHeight,
      {
        toValue: screenHeight
      }
    ).start()
  }

  onScroll = (event) => {
    let currentOffsetY = event.nativeEvent.contentOffset.y
    const diff = currentOffsetY - this.state.offsetY

    if (Math.abs(diff) < 2) {
      console.log('unclear')
    } else if (diff<0) {
      this.toggleAudioBarUp()
    } else {
      this.toggleAudioBarDown()
    }

    this.setState({
      offsetY: currentOffsetY
    })
  }

  onScrollEndReached = () => {
    const { lastKey } = this.state
    const { actions } = this.props

    if(lastKey === null ) {
      return
    } else {
      firebase.database()
        .ref('capsules')
        .orderByKey()
        .endAt(lastKey)
        .limitToLast(3)
        .on('child_added', (snapshot, prevChildKey) => {

          if (lastKey === null) {
            return
          }

          if (snapshot.key !== lastKey) {

            this.setState({
              lastKey: prevChildKey
            })

            let cap = snapshot.val()
            let audios = []
            let capsule = []

            Object.values(cap.audios).forEach((audio) => {
              audios = [...audios, {
                active: false,
                name: audio.audioName,
                length: audio.length,
                url: audio.url
              }]
            })

            capsule = [
              ...capsule,
              {
                title: cap.title,
                audios
              }
            ]

            actions.storeCapsuleAudios(capsule)

            audios = []
            capsule = []
          }
        })
    }
  }

  render () {
    let CapUnit
    const {
      playState,
      capsules,
      audioName,
      audioLength,
      audioUrl
    } = this.props

    const { audioBarActive } = this.state

    const { navigate } = this.props.navigation
    if(capsules) {
      CapUnit = capsules.map((cap, i) => {
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
                    onPress={this.onPressAudio.bind(this, audio, i, j)}
                    underlayColor="#fff"
                  >
                    <View style={styles.capAudio}>
                      <Image
                        source={audio.active ? buttons.playing : buttons.playable}
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
        <View>
          <Image
            style={styles.banner}
            source={require('../../assets/img/knowledgeCapsule/banner.png')}
          />
        </View>
        <Content
          onScroll={audioBarActive ? this.onScroll : null}
          style={{ marginBottom: 20 }}
          onMomentumScrollEnd={this.onScrollEndReached}
        >
          {CapUnit? CapUnit : <Text>123</Text>}
        </Content>
        <Animated.View
          style={[styles.popoutAudioPlayBar, {top: this.state.popoutAudioBarHeight} ]}
        >
          <TouchableHighlight
            transparent
            onPress={this.playOrPause}
            underlayColor="#fff"
          >
            <Image
              source={ playState === 'playing' ? buttons.pause : buttons.playingOnAudioBar}
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
            onPress={() => navigate(
              'PlayAudioScreen',
              {
                player: this.player,
                playOrPauseFunc: this.playOrPause,
                forward: this.forward,
                backward: this.backward
              }
            )}
          >
            <Image
              source={buttons.expand}
              style={styles.open}
            />
          </Button>
        </Animated.View>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KnowledgeCapsule)

