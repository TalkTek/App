// @flow
'use strict'

import React, { Component } from 'react'
import { 
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import {
  Container,
  Content,
  Input
} from 'native-base'
import { feedBackStyle } from './styles'

class Feedback extends Component {
  render() {
    return (
      <Container>
        <Content style={feedBackStyle.content}>
          <Text style={feedBackStyle.textLabel}>
            姓名（必填）
          </Text>
          <View style={feedBackStyle.input}>
            <Input />
          </View>
          <Text style={feedBackStyle.textLabel}>
            Email（必填）
          </Text>
          <View style={feedBackStyle.input}>
            <Input />
          </View>
          <Text style={feedBackStyle.textLabel}>
            內容（必填）
          </Text>
          <View style={[feedBackStyle.input, feedBackStyle.mutiInput]}>
            <Input multiline />
          </View>
          <TouchableOpacity style={feedBackStyle.sendBtn}>
            <Text style={feedBackStyle.sendText}>
              送出
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    )
  }
}

export default Feedback
