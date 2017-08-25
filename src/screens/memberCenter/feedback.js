// @flow
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import memberAction from '../../reducer/member/memberAction'
import { 
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import {
  Container,
  Content,
  Input,
  Picker,
  Toast
} from 'native-base'
import { H4 } from '../../components/text'
import { feedBackStyle } from './styles'
import { Button } from '../../components/button'

type toastInfo = {
  text: string,
  position: string,
  buttonText: string,
  duration: number
}

@connect((state) => ({
  userId: state.member.uid,
  status: state.member.sendStatus
}), (dispatch) => ({
  action: bindActionCreators(memberAction.sendFeedback, dispatch)
}))

class Feedback extends Component {
  content = {
    feedback: '產品建議',
    bugIssue: '使用問題',
    other: '其他'
  }

  props: {
    status: number,
    action: Function,
    userId: string|null
  }

  static defaultProps = {
    status: 0,
    action: () => {},
    userId: null
  }

  state: {
    type: string,
    content: string
  }

  state = {
    type: 'feedback',
    content: ''
  }

  send = () => {
    if (this.state.content.replace(' ', '').length === 0) {
      let info: toastInfo = {
        text: '請輸入內容！',
        position: 'bottom',
        buttonText: '好的',
        duration: 2000
      }
      Toast.show(info)
    } else {
      this.props.action({
        type: this.state.type,
        content: this.state.content,
        userId: this.props.userId
      })
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.status === 0) {
      const info: toastInfo = {
        text: '傳送成功！',
        position: 'bottom',
        buttonText: '好的',
        duration: 2000
      }
      Toast.show(info)
    }
  }

  render() {
    let Item = Picker.Item
    return (
      <Container>
        {
          this.props.status === 1 &&
          <View style={feedBackStyle.indicator}>
            <ActivityIndicator 
              animating
              color="#000"
              size="large"
            />
          </View>
        }
        {
          this.props.status !== 1 &&
          <Content style={feedBackStyle.content}>
            <H4 gray style={feedBackStyle.textLabel}> 
              選擇回饋類型
            </H4> 
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
                  Object.keys(this.content).map((val, i) => {
                    return (
                      <Item label={this.content[val]} value={val} key={i} />
                    )
                  })
                }
              </Picker>
            </View>
            <H4 gray style={feedBackStyle.textLabel}>
              內容（必填）
            </H4>
            <View style={[feedBackStyle.input, feedBackStyle.mutiInput]}>
              <Input onChangeText={(value: string) => this.setState({content: value})} multiline />
            </View>
            <Button 
              text="送出"
              backgroundColor='rgb(31, 191, 179)'
              borderRadius={8}
              textSize='H4'
              textColor='white'
              style={feedBackStyle.sendBtn}
              onPress={this.send}
            />
          </Content>
        }
      </Container>
    )
  }
}

export default Feedback
