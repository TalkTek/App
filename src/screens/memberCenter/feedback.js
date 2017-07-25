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
  content = [
    '姓名（必填）',
    'Email（必填）'
  ]

  render() {
    return (
      <Container>
        <Content style={feedBackStyle.content}>
          {
            this.content.map((val, i) => {
              return (
                <View key={i}>
                  <Text style={feedBackStyle.textLabel}>
                    {val}
                  </Text>
                  <View style={feedBackStyle.input}>
                    <Input />
                  </View>
                </View>
              )
            })
          }
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
