// @flow
'use strict'

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  Button,
  TouchableOpacity
} from 'react-native'

import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Text,
  Left,
  Right
} from 'native-base'

const { width } = Dimensions.get('window')

export default class TalkList extends Component {
  componentWillMount() {
    const { dispatch, navigate } = this.props.navigation
    // dispatch(NavigationActions.reset({
    //   index: 1,
    //   action: [
    //     navigate('TalkList')
    //   ]
    // }))
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Content style={styles.content}>
          <TouchableOpacity
            onPress={ () => navigate('TalkContent')}
          >
            <Card style={styles.cardContainer}>
              <CardItem style={styles.cardItem}>
                <Left style={{paddingTop: 6}}>
                  <Thumbnail
                    source={require('../../assets/img/bubu.png')} />
                  <Body>
                    <Text style={styles.mainTitle}>如何成為用熱愛事務賺錢的『知識型網紅』</Text>
                    <Text style={styles.subTitle}>艾希莉布 | Talk小講編輯部 </Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image
                  source={require('../../assets/img/demo_banner.jpg')}
                  style={styles.bannerImage}
                />
              </CardItem>
              <CardItem style={styles.cardItem}>
                <Left>
                  <Text style={styles.appendText}>
                    累積656人次收聽
                  </Text>
                </Left>
                <Right>
                  <Text style={styles.appendText}>
                    8分鐘語音
                  </Text>
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>
          <Card style={styles.cardContainer}>
            <CardItem style={styles.cardItem}>
              <Left style={{paddingTop: 6}}>
                <Thumbnail
                  source={require('../../assets/img/TalkListThumb.png')} />
                <Body>
                  <Text style={styles.mainTitle}>群眾募資，坐而言也要起而行！</Text>
                  <Text style={styles.subTitle}>林大涵 | 貝殼放大共同創辦人 </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={require('../../assets/img/TalkListbanner.png')}
                style={styles.bannerImage}
              />
            </CardItem>
            <CardItem style={styles.cardItem}>
              <Left>
                <Text style={styles.appendText}>
                  累積656人次收聽
                </Text>
              </Left>
              <Right>
                <Text style={styles.appendText}>
                  20分鐘語音
                </Text>
              </Right>
            </CardItem>
          </Card>

        </Content>
      </Container>
    )
  }
}

const styles = {
  content: {
    flex: 1,
    padding: width * 0.042,
    backgroundColor: 'rgb(250, 250, 250)'
  },
  bannerImage: {
    width: width * 0.82,
    resizeMode: 'contain',
    height: 120,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 10,
    width: width * 0.914
  },
  cardItem: {
    paddingLeft: 8,
    paddingRight: 8
  },
  mainTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 12
  },
  appendText: {
    fontSize: 12,
    color: 'rgb(158, 158, 158)',
    lineHeight: 17,
    marginLeft: 0
  }
}
