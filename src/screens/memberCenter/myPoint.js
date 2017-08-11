// @flow
'use strict'

import React, { Component } from 'react'
import { 
  View,
  Text,
  Image
} from 'react-native'
import {
  Container,
  Content,
  Thumbnail
} from 'native-base'
import MyTalk from './myTalk'
import { myPointStyle } from './styles'

class MyPoint extends Component {
  data = {
    '0': { cost: 30, author: '馬那熊 | PTT CATCH 版 版主', content: '愛情是場捉迷藏：關係經營的有效方法之..', date: '2017-06-01 15:02' },
    '1': { cost: 30, author: '馬那熊 | PTT CATCH 版 版主', content: '愛情是場捉迷藏：關係經營的有效方法之..', date: '2017-06-01 15:02' },
  }

  coin = {
    '0': { coin: 500, term: '2017-6-10' }
  }

  _renderCoinComponent(key) {
    return (
      <View 
        key={key}
        style={myPointStyle.pointList}
      >
        <Image 
          source={require('../../assets/img/memberCenter/iconMypoint.png')}
          style={MyPoint.coin}
        />
        <Text style={myPointStyle.pointText}>500 點</Text>
        <Text style={myPointStyle.term}>2017-06-10 號到期</Text>
        <Image 
          source={require('../../assets/img/memberCenter/enter.png')}
          style={myPointStyle.enterIcon}
        />
      </View>
    )
  }

  render() {
    return (
      <Container>
        <Content>
          { Object.keys(this.coin).map(this._renderCoinComponent.bind(this)) }
          <Text 
            style={myPointStyle.container}
          >
            兌換紀錄
          </Text>
          <MyTalk data={this.data}/>
        </Content>
      </Container>
    )
  }
}

export default MyPoint
