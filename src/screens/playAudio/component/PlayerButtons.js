import React, { Component } from 'react'
import {
  TouchableHighlight,
  View
} from 'react-native'
import FunctionIcon from '../../../components/img/icon/XLIcon'
import { connect } from 'react-redux'

let mapStateToProps = (state) => {
  return {
    playState: state.audio.isPlaying
  }
}

class PlayerButtons extends Component {
  style = {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
  render() {
    let { playState, data } = this.props
    let buttons = Object.keys(data||{}).map((buttonKey, i) => {
      let button = data[buttonKey]
      return (
        <TouchableHighlight
          key={buttonKey}
          onPress={() => { 
            //this._buttonGaEvent(buttonKey)
            button.func() 
          }}
          underlayColor="#fff"
        >
          <View>
            <FunctionIcon
              source={button.twoState
                ? (playState
                  ? button.pauseLink : button.playLink
                )
                : button.link
              }
            />
          </View>
        </TouchableHighlight>
      )
    })
    return <View style={this.style}>{buttons}</View>
  }
}

export { PlayerButtons }
export default connect(mapStateToProps)(PlayerButtons)
