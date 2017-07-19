// @flow
'use strict'

import React, { Component } from 'react'
import { 
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native'
import {
  Container,
  Content
} from 'native-base'
import { pointCenterStyle } from './styles'

class PointCenter extends Component {
  point = {
    myPoint: 500,
    pointPack: [
      { title: '小資小補包', point: 50, cost: '50.00', other: '使用期限三個月' },
      { title: '資深份子包：現賺 10%', point: 110, cost: '100.00', other: '使用期限三個月' },
      { title: '知識焦慮包：現賺 20%', point: 240, cost: '200.00', other: '使用期限三個月' }
    ]
  }

  state = {
    select: NaN
  }

  _selectItem(index) {
    this.setState({
      select: index
    })
  }

  _renderSelector(data, index) {
    return (
      <TouchableOpacity 
        style={[pointCenterStyle.selector, (this.state.select === index)? pointCenterStyle.selected: {}]}
        key={data.title}
        onPress={this._selectItem.bind(this, index)}
      >
        <Text style={[pointCenterStyle.textCenter, pointCenterStyle.smallText]}>
          { data.title }
        </Text>
        <View style={pointCenterStyle.pointCostWrapper}>
          <Text style={[pointCenterStyle.buyPointText, pointCenterStyle.bigText]}>
            { data.point }點
          </Text>
          <Text style={[pointCenterStyle.myPointText, pointCenterStyle.bigText]}>
            $ { data.cost }
          </Text>
        </View>
        <Text style={[pointCenterStyle.textCenter, pointCenterStyle.otherText]}>
          { data.other }
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    console.log((this.state.select))
    return (
      <Container style={pointCenterStyle.container}>
        <Content>
          <View style={pointCenterStyle.nowPoint}>
            <Text style={pointCenterStyle.myPointText}>
              目前持有點數：{ this.point.myPoint } 點
            </Text>
          </View>
          { this.point.pointPack.map(this._renderSelector.bind(this)) }
          {
            !isNaN(this.state.select) &&
            <TouchableOpacity
              style={pointCenterStyle.paymentBtn}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={pointCenterStyle.btnColor}>
                進行付款
              </Text>
            </TouchableOpacity>
          }
        </Content>
      </Container>
    )
  }
}

export default PointCenter
