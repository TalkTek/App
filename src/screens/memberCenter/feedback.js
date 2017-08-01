// @flow
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import memberAction from '../../reducer/member/memberAction'
import { 
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import {
  Container,
  Content,
  Input,
  Picker,
  Toast
} from 'native-base'
import { feedBackStyle } from './styles'

@connect((state) => ({
  userId: state.member.uid
}), (dispatch) => ({
  action: bindActionCreators(memberAction.sendFeedback, dispatch)
}))

class Feedback extends Component {
  content = [
    '產品建議',
    '使用問題',
    '其他'
  ]

  state = {
    type: 0,
    content: ''
  }

  send = () => {
    if (this.state.content.replace(' ', '').length === 0) {
      Toast.show({
        text: '請輸入內容！',
        position: 'bottom',
        buttonText: '好的',
        duration: 2000
      })
    } else {
      this.props.action({
        type: this.state.type,
        content: this.state.content,
        userId: this.props.userId
      })
    }
  }

  render() {
    let Item = Picker.Item
    return (
      <Container>
        <Content style={feedBackStyle.content}>
          <Text style={feedBackStyle.textLabel}> 
            選擇回饋類型
          </Text> 
          <View>
            <Picker
              mode="dropdown"
              color={'#000'}
              selectedValue={this.state.type}
              iosHeader="回饋類型"
              placeHolder="請選擇回饋類型"
              style={{flex: 1}}
              onValueChange={(value) => this.setState({type: value})}
            >
              {
                this.content.map((val, i) => {
                  return (
                    <Item label={val} value={i} key={i} />
                  )
                })
              }
            </Picker>
          </View>
          <Text style={feedBackStyle.textLabel}>
            內容（必填）
          </Text>
          <View style={[feedBackStyle.input, feedBackStyle.mutiInput]}>
            <Input onChangeText={(value) => this.setState({content: value})} multiline />
          </View>
          <TouchableOpacity onPress={this.send} style={feedBackStyle.sendBtn}>
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
