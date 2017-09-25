// @flow
'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import React, { Component } from 'react'

import analyticActions from '../../reducer/analytic/analyticAction'
import audioActions from '../../reducer/audio/audioAction'
import capsuleAction from '../../reducer/capsule/capsuleAction'
import downloadActions from '../../reducer/download/downloadAction'

import {
  TouchableHighlight,
  Animated,
  Dimensions,
  ActivityIndicator,
  Share,
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
  Footer,
  Image
} from 'native-base'
import styles from './styles'
import Icon from '../../components/img/icon/SmallIcon'
import ScrollBanner from '../../components/ScrollBanner'
import { H3, H4 } from '../../components/text'
import { LAYOUT } from 'StyleConfig'
import jwt from 'react-native-jwt-io'
import Banner from '../../components/img/banner/fullWidthBanner'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
console.log('screenHeight', screenHeight)
console.log('screenWidth', screenWidth)

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
  lastKey: state.capsule.lastKey
}), dispatch => ({
  actions: bindActionCreators({...audioActions, ...analyticActions, ...capsuleAction, ...downloadActions}, dispatch),
}))
export class KnowledgeCapsule extends Component {

  state = {
    audioBarActive: false,
    offsetY: 0,
    fabActive: '',
    fabScale: new Animated.Value(0)
  }

  loadCount = 3

  touchY = -1

  _resolveData(lastKey) {
    const { actions } = this.props
    actions.loadCpAudio({
      lastKey,
      limitToLast: this.loadCount
    })
  }

  componentDidMount() {
    const { actions, lastKey } = this.props
    this._resolveData(lastKey)
    actions.gaSetScreen('KnowledgeCapsule')
  }

  _onScroll = (event) => {
    const {
      actions
    } = this.props
    if (this.touchY === -1) {
      this.touchY = event.nativeEvent.pageY
    } else {
      const diff = event.nativeEvent.pageY - this.state.offsetY
      if(diff > 10) {
        actions.showAudioPopoutBar()
      } else if(diff < -10) {
        actions.hideAudioPopoutBar()
      }
      this.setState({
        offsetY: event.nativeEvent.pageY
      })
    }
  }

  _onPress = (parentKey, childKey) => {
    const { actions } = this.props
    actions.onPress(parentKey, childKey, 'remote')
    // 'remote' means which audioSource you want to use
  }

  _onScrollEndReached = () => {
    const { lastKey } = this.props

    if (lastKey === null) {
      return
    } else {
      this._resolveData(lastKey)
    }
  }

  _callShare(capsuleId, parentId) {
    // const token = btoa(`{"parentId": "${capsuleId}", "capsuleId": "${parentId}"}`)
    const token = jwt.encode({
      capsuleId,
      parentId
    }, 'secret')
    Share.share({
      title: 'talk 小講膠囊分享',
      url: `https://talktekfront.herokuapp.com/capsule/${token}`
    })
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

      CapUnit = Object.keys(capsules).map((parentKey, i) => {
        return (
          <View key={i} style={styles.capContainer}>
            <View style={styles.capTitle}>
              <H3>
                {capsules[parentKey].title}
              </H3>
            </View>
              {
                Object.keys(capsules[parentKey].audios).map((childKey, j) => {
                  let audio = capsules[parentKey].audios[childKey]
                  return (
                    <View style={styles.capUnit} key={j}>
                      <TouchableHighlight
                        style={styles.capPlayPauseButton}
                        onPress={this._onPress.bind(this, parentKey, childKey)}
                        underlayColor="#fff"
                      >
                        <View style={styles.capAudio}>
                          <Icon
                            source={audio.active ? buttons.playing : buttons.playable}
                            marginRight={12}
                          />
                          <View style={LAYOUT.vertical}>
                            <H3 style={audio.active ? styles.capAudioTextPlaying : styles.capAudioTextNotPlaying}>
                              {audio.audioName}
                            </H3>
                            <H4 gray style={styles.audioLengthText}>
                                {audio.downloaded === false ? audio.length.formatted : `${audio.length.formatted} 已下載`}
                            </H4>
                          </View>
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight 
                        underlayColor="#fff" 
                        testID={`floatActionButton${childKey}`}
                        onPress={() => { 
                          this.setState({ fabActive: audio.id, fabScale: new Animated.Value(0) }, 
                            () => 
                              Animated.spring( 
                                this.state.fabScale, 
                                { 
                                  toValue: 1, 
                                  speed: 5, 
                                  bounciness: 12 
                                } 
                              ).start() 
                          ) 
                        }}>
                        <View>
                          { 
                            audio.id && 
                            this.state.fabActive === audio.id && 
                            <Animated.View style={{ transform: [{ scale: this.state.fabScale }], ...styles.fabStyle}}> 
                              <TouchableHighlight
                                testID={`downloadButton${childKey}`} 
                                onPress={() => { 
                                  console.log(audio.audioName + ' download') 
                                  this.props.actions.downloadCpAudio(audio) 
                                  }} 
                              > 
                                <View> 
                                  <H3 style={{textAlign: 'center', textAlignVertical: 'center', lineHeight: 28}}>下載</H3> 
                                </View> 
                              </TouchableHighlight> 
                              <TouchableHighlight 
                                onPress={this._callShare.bind(this, audio.id, audio.parentKey)} 
                              > 
                                <View> 
                                  <H3 style={{textAlign: 'center', textAlignVertical: 'center', lineHeight: 28}}>分享</H3> 
                                </View> 
                              </TouchableHighlight>
                            </Animated.View> 
                          } 
                          <Icon 
                            source={buttons.playing}
                            style={styles.capPlayPauseButtonImage}
                          />
                          </View>
                        </TouchableHighlight>
                    </View>
                  )
                })
              }
          </View>
        )
      })
    }
    
    return (
      <Container testID='knowledgeCapsule' style={styles.container}
        onMoveShouldSetResponder={this.props.isPlaying? this._onScroll: null}
        onStartShouldSetResponder={() => this.setState({fabActive: ''})}
      >
        <Content
          onMomentumScrollEnd={this._onScrollEndReached}
        >
          <ScrollBanner
            source={[
              require('../../assets/img/knowledgeCapsule/banner.png'),
              require('../../assets/img/demo_banner.jpg'),
              require('../../assets/img/TalkListbanner.png')
            ]}
          />
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
export default KnowledgeCapsule


