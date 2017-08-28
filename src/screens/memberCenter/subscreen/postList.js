// @flow
'use strict'

import React, { Component } from 'react'
import { 
  View,
  Text,
  SectionList
} from 'react-native'
import {
  Container,
  Content,
  Thumbnail
} from 'native-base'
import styles from '../styles'

const myTalkStyle = {
  container: {
    ...styles.subBackground
  },
  card: {
    flexDirection: 'column',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    marginBottom: 16,
    borderColor: 'rgb(245, 245, 245)',
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    marginLeft: 16,
    fontSize: 12
  },
  contentWrapper: {
    flexDirection: 'row'
  },
  content: {
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 13,
    flex: 9
  },
  date: {
    color: 'rgb(158, 158, 158)',
    fontSize: 13
  },
  cost: {
    flex: 1,
    color: 'rgb(31, 191, 179)'
  }
}

class PostList extends Component {
  
  data = {
    '0': { author: '馬那熊 | PTT CATCH 版 版主', content: '愛情是場捉迷藏：關係經營的有效方法之..', date: '2017-06-01 15:02' },
    '1': { author: '馬那熊 | PTT CATCH 版 版主', content: '愛情是場捉迷藏：關係經營的有效方法之..', date: '2017-06-01 15:02' },
  }

  _renderListComponent(key) {
    const data = this.props.data?this.props.data[key]:this.data[key]
    return (
      <View 
        key={key} 
        style={myTalkStyle.card}
      >
        <View 
          style={myTalkStyle.authorInfo}>
          <Thumbnail 
            source={require('../../../assets/img/memberCenter/profileIcon.png')}
            small
          />
          <Text style={myTalkStyle.author}>
            { data.author }
          </Text>
        </View>
        <View style={myTalkStyle.contentWrapper}>
          <Text style={myTalkStyle.content}>
            { data.content }
          </Text>
          {
            data.cost && 
            <Text style={myTalkStyle.cost}>
              -{ data.cost }
            </Text>
          }
        </View>
        <Text style={myTalkStyle.date}>
          { data.date }
        </Text>
      </View>
    )
  }

  render() {
    return (
      <Container style={myTalkStyle.container}>
        <Content>
          { Object.keys(this.props.data||this.data).map(this._renderListComponent.bind(this)) }     
        </Content>
      </Container>
    )
  }
}

export default PostList
