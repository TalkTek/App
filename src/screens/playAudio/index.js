// @flow
'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import audioActions from '../../reducer/audio/audioAction'
import analyticAction from '../../reducer/analytic/analyticAction'
import { connect } from 'react-redux'
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
import {
  TouchableHighlight,
} from 'react-native'
import styles from './styles'
import Slider from 'react-native-slider'
import DocScreen from '../../screens/playAudio/playerDoc'
import Modal from 'react-native-modalbox'
import FunctionIcon from '../../components/img/icon/XLIcon'
import CloseIcon from '../../components/img/icon/XSmallIcon'
import Banner from '../../components/img/banner/fullWidthBanner'
import { Actions } from 'react-native-router-flux'
import PlayerButtons from './component/PlayerButtons'
import FooterButtons from './component/FooterButtons'
import { H2, H4, H5 } from '../../components/text'

@connect(state => ({
  isPlaying: state.audio.isPlaying,
  memberUid: state.member.uid,
  userFavoriteCapsules: state.member.favoriteCapsule,
  capsuleId: state.audio.playingAudioStaticInfo.id,
  parentKey: state.audio.playingAudioStaticInfo.parentKey,
  audioName: state.audio.playingAudioStaticInfo.audioName,
  audioUrl: state.audio.playingAudioStaticInfo.url,
  audioLengthFormatted: state.audio.playingAudioStaticInfo.length.formatted,
  audioLengthSec: Number(state.audio.playingAudioStaticInfo.length.sec),
  currentTimeFormatted: state.audio.playingAudioDynamicInfo.currentTime.formatted,
  currentTimeSec: Number(state.audio.playingAudioDynamicInfo.currentTime.sec)
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
        func: () => this._audioIsGoodToggle()
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
    const { actions } = this.props
    actions.hideAudioPopoutBar()
    actions.gaSetEvent({
      category: 'capsule',
      action: 'open player',
      value: {
        label: this.props.audioName,
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
    this.props.actions.seek(pos)
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  openModal = () => {
    this.setState({
      isModalOpen: true,
      swipeToClose: !this.state.swipeToClose
    })
    this.refs.docScreen.open()
  }

  _audioIsGoodToggle = () => {
    const { userFavoriteCapsules, capsuleId, actions } = this.props
    let isPositive = userFavoriteCapsules[capsuleId]

    actions.gaSetEvent({
      category: 'capsule',
      action: this.props.audioIsGood? 'unlike capsule' : 'like capsule',
      value: {
        label: this.props.audioName,
        value: 1
      }
    })
    actions
      .setEvaluation(
        isPositive,
        this.props.capsuleId,
        this.props.parentKey,
        this.props.memberUid
      )
  }

  _buttonGaEvent(type) {
    if (type !== 'playOrPause')
      this.props.ga.gaSetEvent({
        category: 'capsule',
        action: type,
        value: {
          label: this.props.audioName,
          value: 1
        }
      })
  }

  _gaGoBack() {
    this.props.ga.gaSetEvent({
      category: 'capsule',
      action: 'close player',
      value: {
        label: this.props.audioName,
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
      audioName,
      audioLengthFormatted,
      audioLengthSec,
      currentTimeFormatted,
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
                {audioName}
              </H2>
            </View>
            <View style={styles.audioType}>
              <H4 gray>
                #方法技能
              </H4>
            </View>
            <View style={styles.slider}>
              <View style={styles.sliderTime}>
                <H5 gray>{currentTimeFormatted ? currentTimeFormatted : '00:00'}</H5>
                <H4/>
                <H5 gray>{audioLengthFormatted}</H5>
              </View>
              <Slider
                value={this.props.currentTimeSec}
                step={1}
                maximumValue={audioLengthSec}
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayAudio)
