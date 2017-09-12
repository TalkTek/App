import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Button } from '../../../components/button'
import { H3 } from '../../../components/text'
import { LAYOUT, COLORS } from 'StyleConfig'

class SubScribe extends Component {

  _subcribe = () => {

  }

  _renderScribeBtn () {
    return (
      <View>
        <Button 
          text='立即訂閱'
          textColor='white'
          backgroundColor={COLORS.green}
          padding={11}
          borderRadius={5}
          fullWidth
          onPress={this._subcribe}
          />
      </View>
    )
  }

  _renderPoint () {
    return (
      <View style={[LAYOUT.horizontal, styles.pointWrapper]}>
        <Image source={require('../../../assets/img/talkContent/iconMypoint.png')} />
        <H3 bold style={styles.point}>{`${50} 點`}</H3>
      </View>
    )
  }

  render() {
    return (
      <View style={[LAYOUT.horizontal, styles.wrapper]}>
        <View>
          {this._renderPoint()}
        </View>
        {this._renderScribeBtn()}
      </View>
    )
  }
}

const styles = {
  wrapper: {
    minHeight: 64,
    alignItems: 'center',
    backgroundColor: COLORS.pureWhite,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingLeft: 16,
    paddingRight: 16
  },
  pointWrapper: {
    alignItems: 'center'
  },
  point: {
    marginLeft: 8
  }
}

export default SubScribe
