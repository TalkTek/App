import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import {
  Container,
  Content,
  Header,
  Right,
  Button
} from 'native-base'
import { Image } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import audioAction from '../../reducer/audio/audioAction'
import HtmlView from 'react-native-htmlview'
import styles from './styles'

@connect((state) => ({
  capsuleId: state.audio.playingAudioInfo.capsulesId,
  parentKey: state.audio.playingAudioInfo.parentKey,
  draft: state.audio.playingAudioInfo.draft
}), (dispatch) => ({
  action: bindActionCreators(audioAction, dispatch)
}))

class PlayerDoc extends Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    let { capsuleId, parentKey } = this.props
    this.props.action.cpAudioGetDoc({capsuleId, parentKey})
  }

  render () {
    const {
      goBack,
    } = this.props.navigation

    const buttons = {
      close: {
        img: require('../../assets/img/playAudio/close.png'),
        func: () => goBack()
      }
    }

    const style = {
      htmlView: {
        marginLeft: 20,
        marginRight: 20
      },
      element: {
        p: {
          marginTop: 0,
          marginBottom: 0,
          padding: 0
        }
      }
    }

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Right>
            <Button
              transparent
              onPress={buttons.close.func}
            >
              <Image
                source={buttons.close.img}
              />
            </Button>
          </Right>
        </Header>
        <Content>
          <HtmlView
            value={this.props.draft}
            style={style.htmlView}
            stylesheet={style.element}
          />
        </Content>
      </Container>
    )
  }
}

export default PlayerDoc
