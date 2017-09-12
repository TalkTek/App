import React, { Component } from 'react'
import {
  View
} from 'react-native'
import { H3, H4 } from '../../components/text'
import { COLORS, LAYOUT } from 'StyleConfig'
import Hr from './component/hr'
import Avatar from '../../components/img/Thumbnail/SmallThumb'
import { Button } from '../../components/button'

const tempData = [
  {name: 'User you', comment: '請問老師，如何成為用熱愛', time: '1 小時前'},
  {name: '林冠宇', comment: '我很喜歡這篇，收下拉！', time: '1 小時前' }
]

class Comment extends Component {

  _onPressComment =  () => {

  }

  _renderComment () {
    const element = 
      tempData.map((val, i) => {
        return (
          <View key={i}>
            <View style={[LAYOUT.horizontal, styles.commentWrapper]}>
              <View>
                <Avatar source={require('../../assets/img/profilePicture2.png')} />
              </View>
              <View style={[LAYOUT.vertical, styles.commentRight]}>
                <H4 bold style={styles.userName}>{val.name}</H4>
                <H3>{val.comment}</H3>
                <H4 gray style={styles.time}>{val.time}</H4>
              </View>
            </View>
            <Hr />
          </View>
        )
      })
    return element
  }

  _renderTitle () {
    return (
      <View style={styles.title}>
        <H3 bold>留言</H3>
      </View>
    )
  }

  _renderButton = (
    <View>
      <Hr />
        <Button 
          text='我要留言'
          padding={19}
          textColor='green'
          bold
          onPress={this._onPressComment}
          />
      <Hr />
    </View>
  )

  render () {
    return (
      <View style={styles.wrapper}>
        {this._renderTitle()}
        {this._renderButton}
        {this._renderComment()}
      </View>
    )
  }
}

const styles = {
  wrapper: {
    backgroundColor: COLORS.pureWhite,
    marginTop: 12,
    padding: 16,
  },
  title: {
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 3,
    paddingBottom: 19
  },
  commentWrapper: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'flex-start'
  },
  commentRight: {
    marginLeft: 16
  },
  userName: {
    marginTop: 9,
    marginBottom: 10
  },
  time: {
    marginTop: 8
  }
}

export default Comment
