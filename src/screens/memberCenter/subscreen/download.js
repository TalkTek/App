// @flow
import { bindActionCreators } from 'redux'
import React, { Component } from 'react'

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
  Footer,
  SwipeRow
} from 'native-base'
import { connect } from 'react-redux'
import MemberAction from '../../../reducer/member/memberAction'
import analyticActions from '../../../reducer/analytic/analyticAction'
import audioActions from '../../../reducer/audio/audioAction'
import downloadActions from '../../../reducer/download/downloadAction'
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
  capsules: state.audio.downloadedcapsules,
  //isCpAudioLoaded: state.audio.isCpAudioLoaded,
  lastKey: state.capsule.lastKey,
  //memberUid: state.member.uid,
}
)
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...audioActions, ...analyticActions, ...downloadActions}, dispatch),
})

export class Download extends Component {
  props: {
    capsules: Object,
    lastKey: string,
    actions: Object
  }
  componentDidMount(){
    this.props.actions.getDownloadedCpAudio()
  }
  _onPress = (parentKey: string, childKey: string) => {
    const { actions } = this.props
    actions.onPress(parentKey, childKey, 'local')
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
        //if (capsules[parentKey].audios[childKey].downloaded)
          return (
            <SwipeRow
            rightOpenValue={-75}
            disableRightSwipe
            body={<View testID='SwipeRow' key={i + j} style={{width: '100%'}}>
              <TouchableHighlight
                onPress={() => this._onPress(parentKey, childKey)}
                underlayColor="#fff"
              >
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
            }
            right={
              <TouchableHighlight testID='SwipeRow.RightItem' onPress={() => this.props.actions.removeDownloadedCpAudio({...capsules[parentKey].audios[childKey], parentKey: parentKey})}>
                <View style={{backgroundColor: 'red', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: 'white'}}>Delete</Text>
                </View>
              </TouchableHighlight>
            }
            />
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
