// @flow
'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import audioActions from '../../reducer/audio/audioAction'
import analyticAction from '../../reducer/analytic/analyticAction'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import {
  Container,
  View,
  Text,
  Header,
  Left,
  Body,
  Right,
  Button,
  Content,
  Footer
} from 'native-base'
import styles from './styles'
import Slider from 'react-native-slider'
import DocScreen from '../../screens/playAudio/playerDoc'
import Modal from 'react-native-modalbox'
import CloseIcon from '../../components/img/icon/XSmallIcon'
import Banner from '../../components/img/banner/fullWidthBanner'
import { Actions } from 'react-native-router-flux'
import PlayerButtons from './component/PlayerButtons'
import FooterButtons from './component/FooterButtons'
import { H2, H4, H5 } from '../../components/text'
import {
  getPlayingAudioStaticInfo,
  getPlayingAudioDynamicInfo,
  isPlaying,
} from '../../reducer/audio/audioSelector'
import {
  getFavoriteCapsule
} from '../../reducer/member/memberSelector'

@connect(createStructuredSelector({
  audioStaticInfo: getPlayingAudioStaticInfo(),
  audioDynamicInfo: getPlayingAudioDynamicInfo(),
  isPlaying: isPlaying(),
  userFavoriteCapsules: getFavoriteCapsule()
}), dispatch => ({
  actions: bindActionCreators({...audioActions, ...analyticAction}, dispatch)
}))
class PlayAudio extends Component {
  state = {
    isModalOpen: false,
    swipeToClose: true,
  }

  buttons = {
    close: require('../../assets/img/playAudio/close.png'),
    footer: {
      good: {
        notActive: require('../../assets/img/playAudio/good.png'),
        active: require('../../assets/img/playAudio/goodActive.png'),
        checkActive: () => this.isGood(),
        name: 'likeCounter',
        func: () => this.toggleLike()
      },
      // timer: {
      //   notActive: require('../../assets/img/playAudio/timer.png'),
      //   name: '00:00'
      // },
      // addSpeed: {
      //   notActive: require('../../assets/img/playAudio/addSpeed.png'),
      //   name: '速率'
      // },
      word: {
        notActive: require('../../assets/img/playAudio/word.png'),
        name: '文檔',
        func: () => this.openModal()
      },
      // more: {
      //   notActive: require('../../assets/img/playAudio/more.png'),
      //   name: '更多'
      // }
    },
    body: {
      backward15: {
        twoState: false,
        link: require('../../assets/img/audioElement/backward15.png'),
        func: () => this.props.actions.backward15()
      },
      backward: {
        twoState: false,
        link: require('../../assets/img/audioElement/backward.png'),
        func: () => this.props.actions.previous()
      },
      playOrPause: {
        twoState: true,
        playLink: require('../../assets/img/playAudio/play.png'),
        pauseLink: require('../../assets/img/audioElement/pause.png'),
        func: () => this.playOrPause()
      },
      forward: {
        twoState: false,
        link: require('../../assets/img/audioElement/forward.png'),
        func: () => this.props.actions.next()
      },
      forward15: {
        twoState: false,
        link: require('../../assets/img/audioElement/forward15.png'),
        func: () => this.props.actions.forward15()
      },
    }
  }

  componentDidMount() {
    const { actions, audioStaticInfo } = this.props
    actions.hideAudioPopoutBar()
    actions.gaSetEvent({
      category: 'capsule',
      action: 'open player',
      value: {
        label: audioStaticInfo.audioName,
        value: 1
      }
    })
  }

  playOrPause = () => {
    const {isPlaying, actions} = this.props
    if (!isPlaying) {
      actions.play()
    } else {
      actions.pause()
    }
  }

  isGood = () => {
    const { userFavoriteCapsules, capsuleId } = this.props
    return userFavoriteCapsules[capsuleId]
  }

  _onSlidingComplete = (pos) => {
    const { actions } = this.props
    actions.seek(pos)
  }

  // toggle Doc screen modal
  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  // open Doc Moal
  openModal = () => {
    this.setState({
      isModalOpen: true,
      swipeToClose: !this.state.swipeToClose
    })
    this.refs.docScreen.open()
  }

  toggleLike = () => {
    const { actions, audioStaticInfo } = this.props
    actions.gaSetEvent({
      category: 'capsule',
      action: this.isGood() ? 'unlike capsule' : 'like capsule',
      value: {
        label: audioStaticInfo.audioName,
        value: 1
      }
    })
    actions.setEvaluation()
  }

  _buttonGaEvent(type) {
    const { actions, audioStaticInfo } = this.props
    if (type !== 'playOrPause')
      actions.gaSetEvent({
        category: 'capsule',
        action: type,
        value: {
          label: audioStaticInfo.audioName,
          value: 1
        }
      })
  }

  _gaGoBack() {
    const { actions, audioStaticInfo } = this.props
    actions.gaSetEvent({
      category: 'capsule',
      action: 'close player',
      value: {
        label: audioStaticInfo.audioName,
        value: 1
      }
    })
  }

  back = () => {
    const { actions } = this.props
    actions.showAudioPopoutBar()
    Actions.pop()
  }

  render () {
    const {
      audioStaticInfo,
      audioDynamicInfo: { currentTime }
    } = this.props

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left/>
          <Body/>
          <Right>
            <Button
              transparent
              onPress={this.back}
            >
              <CloseIcon
                source={this.buttons.close}
              />
            </Button>
          </Right>
        </Header>
        <Content
          directionalLockEnabled
        >
          <View>
            <Banner
              source={require('../../assets/img/knowledgeCapsule/banner.png')}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.title}>
              <H2 black>
                {audioStaticInfo.audioName}
              </H2>
            </View>
            <View style={styles.audioType}>
              <H4 gray>
                #方法技能
              </H4>
            </View>
            <View style={styles.slider}>
              <View style={styles.sliderTime}>
                <H5 gray>{currentTime.formatted ? currentTime.formatted : '00:00'}</H5>
                <H4/>
                <H5 gray>{audioStaticInfo.length.formatted}</H5>
              </View>
              <Slider
                value={this.props.currentTimeSec}
                step={1}
                maximumValue={Number(audioStaticInfo.length.sec)}
                onSlidingComplete={this._onSlidingComplete}
                minimumTrackTintColor='rgb(31, 191, 179)'
                thumbTouchSize={{width: 20, height: 20}}
                trackStyle={styles.track}
                thumbStyle={styles.trackThumb}
              />
            </View>
            <PlayerButtons data={this.buttons.body}/>
          </View>
        </Content>
        <View style={styles.footer}>
          <FooterButtons data={this.buttons.footer} />
        </View>
        <Modal
          ref={'docScreen'}
          position={'center'}
          isOpen={this.state.isModalOpen}
          swipeToClose={this.state.swipeToClose}
          swipeArea={0}
        >
          <DocScreen
            toggleModal={this.toggleModal}
          />
        </Modal>
      </Container>
    )
  }
}

PlayAudio.propTypes = {
  actions: React.PropTypes.object,
  audioDynamicInfo: React.PropTypes.object,
  audioStaticInfo: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
  userFavoriteCapsules: React.PropTypes.object,
}

export default PlayAudio
