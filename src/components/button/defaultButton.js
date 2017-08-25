import React, {Component} from 'react'
import {
  TouchableOpacity,
  View
} from 'react-native'
import * as Text from '../text'

export default class DefaultButton extends Component {
  render() {
    const TextComp = Text[String(this.props.textSize||'H3').toUpperCase()]
    return (
      <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
        <View>
          <TextComp>{this.props.text}</TextComp>
        </View>
      </TouchableOpacity>
    )
  }
}
