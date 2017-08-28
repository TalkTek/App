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
import styles from '../styles'

const pointCenterStyle = {
  container: {...styles.container},
  nowPoint: {
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  myPointText: {
    color: 'rgb(33, 33, 33)',
    textAlign: 'center',
  },
  selector: {
    ...styles.subBackground,
    borderColor: 'rgb(224, 224, 224)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
    justifyContent: 'center'
  },
  pointCostWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16
  },
  buyPointText: {
    color: 'rgb(31, 191, 179)',
    marginRight: 10
  },
  otherText: {
    marginTop: 16,
    color: 'rgb(158, 158, 158)'
  },
  smallText: {
    fontSize: 13
  },
  bigText: {
    fontSize: 18
  },
  textCenter: {
    textAlign: 'center'
  },
  paymentBtn: {...styles.paymentBtn},
  btnColor: {
    color: '#fff'
  },
  selected: {
    borderColor: 'rgb(31, 191, 179)',
    borderWidth: 2,
    marginBottom: 7
  }
}

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
