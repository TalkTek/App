// @flow
'use strict'

import React, { Component } from 'react'
import { 
  View,
  Text
} from 'react-native'
import {
  Container,
  Content
} from 'native-base'
import FeedBack from './feedback'
import { applyStyle } from './styles'

class Apply extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View
            style={applyStyle.welcomeJoin}
          >
            <Text>歡迎有志一同的你一起加入我們</Text>
          </View>
          <FeedBack />
        </Content>
      </Container>
    )
  }
}

export default Apply
