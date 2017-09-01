import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {
  Image,
  TouchableHighlight
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
import { connect } from 'react-redux'
import MemberAction from '../../../reducer/member/memberAction'
import analyticActions from '../../../reducer/analytic/analyticAction'
import audioActions from '../../../reducer/audio/audioAction'
import downloadActions from '../../../reducer/download/downloadAction'
import globalActions from '../../../reducer/global/globalAction'
import RNFetchBlob from 'react-native-fetch-blob'
import '../../../lib/global'
import styles from '../../knowledgeCapsule/styles'
import Icon from '../../../components/img/icon/SmallIcon'

let buttons = {
  'playingOnAudioBar': require('../../../assets/img/audioElement/play.png'),
  'playing': require('../../../assets/img/audioElement/playing2.png'),
  'pause': require('../../../assets/img/audioElement/pause.png'),
  'expand': require('../../../assets/img/knowledgeCapsule/expend.png'),
  'playable': require('../../../assets/img/audioElement/playing1.png')
}

const mapStateToProps = (state) => ({
  //isPlaying: state.audio.isPlaying,
  capsules: state.download.capsules,
  //isCpAudioLoaded: state.audio.isCpAudioLoaded,
  lastKey: state.capsule.lastKey,
  //memberUid: state.member.uid,
}
)
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...audioActions, ...analyticActions, ...downloadActions, ...globalActions}, dispatch),
})

export class Download extends Component {
  componentDidMount() {
    this.props.actions.cpAudioDownloadedInfoGet()
  }
  onPress = (audio, index) => {
    this.props.actions.cpAudioInfoGetSuccess(audio)
    this.props.actions.audioLoad({audio: audio, pos: index, i: -1, j: -1})
    this.props.actions.showAudioPopoutBar()
  }

  render() {
    let CapUnit = null
    const {
      capsules
    } = this.props
    if (capsules) {
      let counter = 0
      let index
      CapUnit = Object.keys(capsules).map((parentKey, i) => {
        return(
        Object.keys(capsules[parentKey].audios).map((childKey, j) => {
        console.log(capsules[parentKey].audios[childKey])  
        return (
          <View key={i + j} style={styles.capUnit}>
            <TouchableHighlight
              style={styles.capPlayPauseButton}
              //onPress={() => this.onPress(capsules[parentKey], i)}
              underlayColor="#fff"
            >
            <View style={styles.capAudio}>
            <Icon
              source={capsules[parentKey].audios[childKey].active ? buttons.playing : buttons.playable}
              marginRight={12}
            />
            <Text style={capsules[parentKey].audios[childKey].active ? styles.capAudioTextPlaying : styles.capAudioTextNotPlaying}>
              {capsules[parentKey].audios[childKey].audioName}
              </Text>
            <Text style={styles.audioLengthText}>
              {capsules[parentKey].audios[childKey].length ? capsules[parentKey].audios[childKey].length.formatted : ''}
              </Text>
          </View>
            </TouchableHighlight>
          </View>
        )
      })
    )
    }
  )
 }
    return (
      <Container style={styles.container}>
        <Content>
          <View>
          {CapUnit}
          </View>
        </Content>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Download)
