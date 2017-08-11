import React, { Component } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView
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
import audioAction from '../../reducer/audio/audioAction'
import analyticAction from '../../reducer/analytic/analyticAction'
import HtmlView from 'react-native-htmlview'
import styles from './styles'

@connect((state) => ({
  capsuleId: state.audio.playingAudioInfo.capsulesId,
  parentKey: state.audio.playingAudioInfo.parentKey,
  draft: state.audio.playingAudioInfo.draft
}), (dispatch) => ({
  actions: bindActionCreators({...audioAction, ...analyticAction}, dispatch),
}))

class PlayerDoc extends Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    let { capsuleId, parentKey, actions } = this.props
    actions.cpAudioGetDoc({capsuleId, parentKey})
    actions.gaSetScreen(`playerDoc/${capsuleId}/${new Date().getHours()}`)
  }

  render () {
    const buttons = {
      close: {
        img: require('../../assets/img/playAudio/close.png'),
        func: () => this.props.toggleModal()
      }
    }

    const style = {
      htmlView: {
        marginLeft: 20,
        marginRight: 20
      },
      loading: {
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
        <ScrollView>
          {
            typeof this.props.draft === 'string'?
            <HtmlView
              value={this.props.draft}
              style={style.htmlView}
              stylesheet={style.element}
            />: 
            <View>
              <ActivityIndicator 
                animating
                color="black"
                size="large"
              />
            </View>
          }
        </ScrollView>
      </Container>
    )
  }
}

export default PlayerDoc
