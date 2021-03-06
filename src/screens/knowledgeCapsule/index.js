// @flow
'use strict'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import audioActions from '../../reducer/audio/audioAction'
import analyticActions from '../../reducer/analytic/analyticAction'
import { connect } from 'react-redux'
import {
  TouchableHighlight,
  Animated,
  Dimensions,
  Image,
  ActivityIndicator,
  Platform,
  NetInfo
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
  Footer
} from 'native-base'
import firebase from 'firebase'
import styles from './styles'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
console.log('screenHeight', screenHeight);
console.log('screenWidth', screenWidth);

let buttons = {
  'playingOnAudioBar': require('../../assets/img/audioElement/play.png'),
  'playing': require('../../assets/img/audioElement/playing2.png'),
  'pause': require('../../assets/img/audioElement/pause.png'),
  'expand': require('../../assets/img/knowledgeCapsule/expend.png'),
  'playable': require('../../assets/img/audioElement/playing1.png')
}

@connect(state => ({
  capsules: state.audio.capsules,
  isCpAudioLoaded: state.audio.isCpAudioLoaded,
}), dispatch => ({
  actions: bindActionCreators({...audioActions, ...analyticActions}, dispatch)
}))

export default class KnowledgeCapsule extends Component {

  state = {
    lastKey: null, // firebase last key
    audioBarActive: false,
    offsetY: 0,
  }

  loadCount = 2

  touchY = -1
  resolveData(capsuleRef) {
    const { actions } = this.props

    capsuleRef
      .orderByKey()
      .once('value')
      .then((snapshot) => {
        let capPush = snapshot.val()
        let audios = []
        let capsule = []
        let capsules = Object.keys(capPush)
        let lastKey = capsules[0]
        let length = capsules.length
        
        if (capsules.length === this.loadCount+1) {
          length = capsules.length - 1
        } else {
          lastKey = null
        }
        this.setState({
          lastKey
        })
        // parent loop
        capsules.reverse().forEach((parentKey, index) => {
          if (index < length) {
            //capsule loop
            Object.values(capPush[parentKey].audios).forEach((audio) => {
              audios = [...audios, {
                active: false,
                parentKey,
                id: audio.id,
                name: audio.audioName,
                length: audio.length,
                url: audio.url,
                likeCounter: audio.likeCounter || 0,
                audioIsGood: audio.audioIsGood,
              }]
            })

            capsule = [
              ...capsule,
              {
                title: capPush[parentKey].title,
                audios
              }
            ]

            actions.storeCapsuleAudios(capsule)
            actions.loadCpAudioSuccess()
          }

          audios = []
          capsule = []
        })
      })
  }

  componentDidMount () {
    const { actions } = this.props
    let capsuleRef = firebase.database().ref('capsules').limitToLast(this.loadCount+1)
    this.resolveData(capsuleRef)
    actions.gaSetScreen('KnowledgeCapsule')
  }

  onScroll = (event) => {
    const {
      _toggleAudioBarUp,
      _toggleAudioBarDown
    } = this.props.navigation
      // let currentOffsetY = event.nativeEvent.contentOffset.y
    if (this.touchY === -1) {
      this.touchY = event.nativeEvent.pageY
    } else {
      // console.log(eve.nativeEvent.pageY - this.touchY)
      // const diff = currentOffsetY - this.state.offsetY
      const diff = event.nativeEvent.pageY - this.state.offsetY
      if(diff > 10) {
        _toggleAudioBarUp()
      } else if(diff < -10) {
        _toggleAudioBarDown()
      }
      console.log(diff)
      this.setState({
        offsetY: event.nativeEvent.pageY
      })
    }
  }

  onPress = (audio, i, j) => {
    const {
      _onPress
    } = this.props.navigation

    this.setState({
      audioBarActive: true,
    })
    _onPress.bind(this, audio, i, j)()
  }

  onScrollEndReached = () => {
    const { lastKey } = this.state

    if (lastKey === null) {
      return
    } else {
      let capsuleRef =
        firebase.database()
          .ref('capsules')
          .endAt(lastKey)
          .limitToLast(this.loadCount+1)

      this.resolveData(capsuleRef)
    }
  }

  render() {
    let CapUnit = null
    const {
      capsules,
      isCpAudioLoaded,
    } = this.props

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
                    onPress={() => this.onPress(audio, i, j)}
                    underlayColor="#fff"
                  >
                    <View style={styles.capAudio}>
                      <Image
                        source={audio.active ? buttons.playing : buttons.playable}
                        style={styles.capPlayPauseButtonImage}
                      />
                      <Text style={audio.active ? styles.capAudioTextPlaying : styles.capAudioTextNotPlaying}>{audio.name}</Text>
                      <Text style={styles.audioLengthText}>{audio.length ? audio.length.formatted : ''}</Text>
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
      <Container style={styles.container}
        onMoveShouldSetResponder={this.state.audioBarActive ? this.onScroll : null}
      >
        <View>
          <Image
            style={styles.banner}
            source={require('../../assets/img/knowledgeCapsule/banner.png')}
          />
        </View>
        <Content
          onMomentumScrollEnd={this.onScrollEndReached}
        >
          {
            isCpAudioLoaded
              ? CapUnit
              :
              <View style={styles.loading}>
                <ActivityIndicator
                  animating
                  color="black"
                  size="large"
                />
              </View>
          }
        </Content>
      </Container>
    )
  }
}


