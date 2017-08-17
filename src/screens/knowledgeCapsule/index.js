// @flow
'use strict'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import audioActions from '../../reducer/audio/audioAction'
import analyticActions from '../../reducer/analytic/analyticAction'
import capsuleAction from '../../reducer/capsule/capsuleAction'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {
  TouchableHighlight,
  Animated,
  Dimensions,
  ActivityIndicator,
  Platform,
  NetInfo
} from 'react-native'
import {
  Container,
  Content,
  View,
  Left,
  Right,
  Button,
  List,
  ListItem,
  Footer
} from 'native-base'
import firebase from 'firebase'
import styles from './styles'
import {
  MessageBarAlert,
  MessageBarManager
} from 'react-native-message-bar'
import {
  Actions
} from 'react-native-router-flux'
import Icon from '../../components/img/icon/SmallIcon'
import Banner from '../../components/img/banner/fullWidthBanner'
import { H3, H4 } from '../../components/text'

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
  isPlaying: state.audio.isPlaying,
  capsules: state.audio.capsules,
  isCpAudioLoaded: state.audio.isCpAudioLoaded,
  lastKey: state.capsule.lastKey,
  memberUid: state.member.uid,
  playingAudioPosI: state.audio.playingAudioInfo.pos.i,
  playingAudioPosJ:state.audio.playingAudioInfo.pos.j
}), dispatch => ({
  actions: bindActionCreators({...audioActions, ...analyticActions}, dispatch),
  capsule: bindActionCreators(capsuleAction, dispatch)
}))

export default class KnowledgeCapsule extends Component {

  state = {
    audioBarActive: false,
    offsetY: 0
  }

  loadCount = 2

  touchY = -1
  resolveData(lastKey) {
    const { actions } = this.props
    this.props.capsule.loadCpAudio({
      lastKey,
      limitToLast: this.loadCount
    })
  }

  componentDidMount () {
    const { actions, lastKey } = this.props
    this.resolveData(lastKey)
    actions.gaSetScreen('KnowledgeCapsule')
  }

  componentWillReceiveProps(nextProps: object) {
    let {playingAudioPosI, playingAudioPosJ} = nextProps
    let i = this.props.playingAudioPosI
    let j = this.props.playingAudioPosJ
    if ( playingAudioPosI!=i || playingAudioPosJ!=j ) {
      this.toggleButtonColor(playingAudioPosI, playingAudioPosJ)
    }
  }

  onScroll = (event) => {
    const {
      showAudioPopoutBar,
      hideAudioPopoutBar
    } = this.props.actions
      // let currentOffsetY = event.nativeEvent.contentOffset.y
    if (this.touchY === -1) {
      this.touchY = event.nativeEvent.pageY
    } else {
      // console.log(eve.nativeEvent.pageY - this.touchY)
      // const diff = currentOffsetY - this.state.offsetY
      const diff = event.nativeEvent.pageY - this.state.offsetY
      if(diff > 10) {
        // _toggleAudioBarDown()
        showAudioPopoutBar()
      } else if(diff < -10) {
        // _toggleAudioBarUp()
        hideAudioPopoutBar()
      }
      console.log(diff)
      this.setState({
        offsetY: event.nativeEvent.pageY
      })
    }
  }

  onPress = (audio: object, i: number, j: number, pos: number) => {
    const {
      actions,
      memberUid
    } = this.props
    
    actions.showAudioPopoutBar()
    actions.cpAudioInfoGet(
      {
        parentKey: audio.parentKey,
        capsuleId: audio.id,
        memberUid
      }
    )
    actions.audioLoad({
      audio,
      i,
      j,
      pos
    })
    this.toggleButtonColor(i, j)
    // _onPress.bind(this, audio, i, j)()
  }

  toggleButtonColor = (i: number, j: number) => {
    const { capsules, playingAudioPosI, playingAudioPosJ } = this.props
    capsules[playingAudioPosI].audios[playingAudioPosJ].active = false
    capsules[i].audios[j].active = true
  }

  onScrollEndReached = () => {
    const { lastKey } = this.props

    if (lastKey === null) {
      return
    } else {
      this.resolveData(lastKey)
    }
  }

  render() {
    let CapUnit = null
    const {
      capsules,
      isCpAudioLoaded,
    } = this.props
    if(capsules) {
      let counter = 0
      let index
      CapUnit = capsules.map((cap, i) => {
        let length = cap.audios.length
        counter += length
        return (
          <View key={i} style={styles.capContainer}>
            <View style={styles.capTitle}>
              <H3>
                {cap.title}
              </H3>
            </View>
            {
              cap.audios.map((audio, j) =>
                <View key={j} style={styles.capUnit}>
                  <TouchableHighlight
                    style={styles.capPlayPauseButton}
                    onPress={this.onPress.bind(this, audio, i, j, counter-(length-j))}
                    underlayColor="#fff"
                  >
                    <View style={styles.capAudio}>
                      <Icon
                        source={audio.active ? buttons.playing : buttons.playable}
                        marginRight={12}
                      />
                      <H3 style={audio.active ? styles.capAudioTextPlaying : styles.capAudioTextNotPlaying}>{audio.name}</H3>
                      <H4 gray>{audio.length ? audio.length.formatted : ''}</H4>
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
        onMoveShouldSetResponder={this.props.isPlaying? this.onScroll: null}
      >
        <View>
          <Banner
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


