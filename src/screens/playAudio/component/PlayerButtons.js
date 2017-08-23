import React, { Component } from 'react'
import {
  TouchableHighlight,
  View
} from 'react-native'
import FunctionIcon from '../../../components/img/icon/XLIcon'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import analyticAction from '../../../reducer/analytic/analyticAction'

const mapStateToProps = (state) => {
  return {
    playState: state.audio.isPlaying,
    audioName: state.audio.playingAudioInfo.name
  }
}

const mapActionToProps = (dispatch) => {
  return {
    ga: bindActionCreators(analyticAction, dispatch)
  }
}

class PlayerButtons extends Component {
  style = {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
  
  _buttonGaEvent(type) {
    if (type !== 'playOrPause')
      this.props.ga.gaSetEvent({
        category: 'capsule',
        action: type,
        value: {
          label: this.props.audioName,
          value: 1
        }
      })
  }

  pressEvent(buttonKey, func) {
    this._buttonGaEvent(buttonKey)
    func()
  }

  render() {
    let { playState, data } = this.props
    let buttons = Object.keys(data||{}).map((buttonKey, i) => {
      let button = data[buttonKey]
      return (
        <TouchableHighlight
          key={buttonKey}
          onPress={this.pressEvent.bind(this, buttonKey, button.func)}
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
export default connect(mapStateToProps, mapActionToProps)(PlayerButtons)
