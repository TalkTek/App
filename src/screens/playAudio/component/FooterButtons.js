import React, { Component } from 'react'
import FunctionIcon from '../../../components/img/icon/XLIcon'
import { H5 } from '../../../components/text'
import {
  TouchableHighlight,
  View
} from 'react-native'
import { COLORS } from 'StyleConfig'

export class FooterButtons extends Component {
  style = {
    flex: 1,
    flexDirection: 'row',
    bottom: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderTop,
    height: 75,
    alignItems: 'center',
    justifyContent: 'space-around'
  }

  wrapperStyle = {
    alignItems: 'center'
  }
  
  render() {
    let { data } = this.props
    let lists = Object.values(data||{}).map((button, i) => {
      return (
        <TouchableHighlight
          transparent
          key={i}
          onPress={typeof button.func === 'function'? button.func: null}
          underlayColor="#fff"
        >
          <View style={this.wrapperStyle}>
            <FunctionIcon
              source={button.checkActive? button.active: button.notActive}
            />
            <H5 gray>
              {!isNaN(this.props[button.name])? this.props[button.name]: button.name}
            </H5>
          </View>
        </TouchableHighlight>
      )
    })
    return (<View style={this.style}>{lists}</View>)
  }
}

export default FooterButtons
