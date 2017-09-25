import React, { Component } from 'react'
import {
  View
} from 'react-native'
import SmallIcon from '../../../components/img/icon/SmallIcon'
import { Button } from '../../../components/button'
import { H5 } from '../../../components/text'
import { LAYOUT } from 'StyleConfig'

const style = {
  wrapper: {
  },
  btnText: {
    textAlign: 'center', 
    marginTop: 5
  },
  spaceAround: {
    justifyContent: 'space-around'
  },
  iconStyle: {
    alignSelf: 'center'
  }
}
export default class TabChanger extends Component {
  state = {
    index: 0
  }
  _lists = [
    { 
      active: require('../../../assets/img/tab_info_icon_active.png'), 
      inActive: require('../../../assets/img/tab_info_icon_inactive.png'),
      text: '簡介'
    },
    { 
      active: require('../../../assets/img/tab_icon_talk_active.png'), 
      inActive: require('../../../assets/img/tab_icon_talk_inactive.png'),
      text: '小講'
    },
    { 
      active: require('../../../assets/img/tab_icon_capsule_active.png'), 
      inActive: require('../../../assets/img/tab_icon_capsule_inactive.png'),
      text: '知識膠囊'
    },
    { 
      active: require('../../../assets/img/tab_icon_comment_active.png'), 
      inActive: require('../../../assets/img/tab_icon_comment_inactive.png'),
      text: '評論'
    },
    { 
      active: require('../../../assets/img/tab_icon_user_active.png'), 
      inActive: require('../../../assets/img/tab_icon_user_inactive.png'),
      text: '會員資訊'
    }
  ]

  _changeTab = (index) => {
    this.setState({
      index
    })
  }
  render() {
    return (
      <View style={[LAYOUT.horizontal, style.spaceAround, style.wrapper]} >
        {
          this._lists.map((src, i) => {
            return (
              <View key={i} style={[LAYOUT.vertical]}>
                <Button 
                  onPress={() => this._changeTab(i)}
                  leftElement={
                    <View>
                      <SmallIcon source={this.state.index == i ? src.active: src.inActive} style={style.iconStyle} />
                      <H5 style={style.btnText}>{src.text}</H5>
                    </View>
                  }
                  style={style.spaceAround}
                />
              </View>
            )
          })
        }
      </View>
    )
  }
}
