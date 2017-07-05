// @flow
'use strict'

import React, { Component } from 'react'
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
  Footer,
} from 'native-base'
import {
  TouchableHighlight,
  Image
} from 'react-native'
import styles from './styles'


const buttons = {
  close: require('../../assets/img/playAudio/close.png'),
  footer: {
    good: {
      link: require('../../assets/img/playAudio/good.png'),
      name: '203'
    },
    goodActive: {
      link: require('../../assets/img/playAudio/goodActive.png'),
      name: '203'
    },
    timer: {
      link: require('../../assets/img/playAudio/timer.png'),
      name: '20:39'
    },
    timerActive: {
      link: require('../../assets/img/playAudio/timerActive.png'),
      name: '20:39'
    },
    addSpeed: {
      link: require('../../assets/img/playAudio/addSpeed.png'),
      name: '速率'
    },
    word: {
      link: require('../../assets/img/playAudio/word.png'),
      name: '文檔'
    },
    more: {
      link: require('../../assets/img/playAudio/more.png'),
      name: '更多'
    }
  }
}

export default class PlayAudio extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  }
  render () {
    const { goBack } = this.props.navigation
    const funcButtons = Object.values(buttons.footer).map((button, i) => (
      <Button
        transparent
      >
        <View>
          <Image
            source={button.link}
          />
          <Text>
            {button.name}
          </Text>
        </View>
      </Button>
    ))

    return (
      <Container>
        <Header>
          <Left/>
          <Body/>
          <Right>
            <Button
              transparent
              onPress={() => goBack()}
            >
              <Image
                source={buttons.close}
              />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.banner}>
           <Image
             source={require('../../assets/img/knowledgeCapsule/banner.png')}
           />
          </View>
        </Content>
        <Footer>
          {funcButtons}
        </Footer>
      </Container>
    )
  }
}
