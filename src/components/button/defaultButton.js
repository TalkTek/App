import React, {Component} from 'react'
import {
  TouchableOpacity,
  View
} from 'react-native'
import * as Text from '../text'
import { LAYOUT } from 'StyleConfig'

export default class DefaultButton extends Component {
  render() {
    const TextComp = Text[String(this.props.textSize||'H3').toUpperCase()]
    const textStyle={
      paddingLeft: 10,
      paddingRight: 10
    }
    const colors = {
      gray: null,
      white: null,
      green: null,
      black: null,
      pureWhite: null
    }

    let style = this.props.style

    if (this.props.textColor)
      colors[this.props.textColor] = true

    return (
      <TouchableOpacity style={[this.props.style, LAYOUT.horizontal, {justifyContent: 'center'}]} onPress={this.props.onPress}>
        {this.props.leftElement}
        <View style={textStyle}>
          <TextComp {...colors}>{this.props.text}</TextComp>
        </View>
        {this.props.rightElement}
      </TouchableOpacity>
    )
  }
}
