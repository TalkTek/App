// @flow
'use strict'

import React, { Component } from 'react'
import { 
  View,
  Text,
  SectionList
} from 'react-native'
import {
  Container,
  Content,
  Thumbnail
} from 'native-base'
import { myTalkStyle } from './styles'

class MyTalk extends Component {
  
  data = {
    0: { author: '馬那熊 | PTT CATCH 版 版主', content: '愛情是場捉迷藏：關係經營的有效方法之..', date: '2017-06-01 15:02' },
    1: { author: '馬那熊 | PTT CATCH 版 版主', content: '愛情是場捉迷藏：關係經營的有效方法之..', date: '2017-06-01 15:02' },
  }

  _renderListComponent(key) {
    const data = this.props.data?this.props.data[key]:this.data[key]
    return (
      <View 
        key={key} 
        style={myTalkStyle.card}
      >
        <View 
          style={myTalkStyle.authorInfo}>
          <Thumbnail 
            source={require('../../assets/img/memberCenter/profileIcon.png')}
            small
          />
          <Text style={myTalkStyle.author}>
            { data.author }
          </Text>
        </View>
        <View style={myTalkStyle.contentWrapper}>
          <Text style={myTalkStyle.content}>
            { data.content }
          </Text>
          {
            data.cost && 
            <Text style={myTalkStyle.cost}>
              -{ data.cost }
            </Text>
          }
        </View>
        <Text style={myTalkStyle.date}>
          { data.date }
        </Text>
      </View>
    )
  }

  render() {
    return (
      <Container style={myTalkStyle.container}>
        <Content>
          { Object.keys(this.props.data||this.data).map(this._renderListComponent.bind(this)) }     
        </Content>
      </Container>
    )
  }
}

export default MyTalk
