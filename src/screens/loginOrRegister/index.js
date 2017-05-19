// @flow
'use strict'

import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import {
  Container,
  Content,
  Button,
  Form,
  View,
  Text,
  Input,
  Item,
} from 'native-base'
import FBSDK, { LoginManager } from 'react-native-fbsdk'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')


export default class Login extends Component {
  static navigationOptions = {
    header: null,
  }

  _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile'])
      .then((result) => {
        if(result.isCancelled) {
          console.log('Login Cancel')
        } else {
          console.log("Login success " + result.grantedPermissions);
        }
      })
      .catch((err) => {
        console.log('An error occured: ', err);
      })
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.bg}>
            <Image source={require('../../assets/img/logo.png')} style={styles.logo} />
            <Form style={styles.form}>
              <Item style={styles.item}>
                <Input placeholder="輸入Email"/>
              </Item>
              <Item style={styles.item}>
                <Input placeholder="輸入密碼" />
              </Item>
            </Form>
            <Button style={{alignSelf: 'auto'}}>
              <Text>
                登入
              </Text>
            </Button>
            <TouchableOpacity onPress={this._fbAuth}>
              <Text>
                Facebook
              </Text>
            </TouchableOpacity>
            <Icon.Button name="google" backgroundColor="rgb(221, 77, 64)">
              Google
            </Icon.Button>
            <TouchableHighlight>
              <Text>註冊新帳號</Text>
            </TouchableHighlight>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = {
  container: {
    backgroundColor: 'rgb(255, 255, 255)',
  },
  bg: {
    flex: 1,
    height: screenHeight,
    alignItems: 'center'
  },
  form: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor:'#000033',
    height:200,
  },
  item: {
    borderWidth: 0,
    borderColor:'red',
    alignSelf: 'auto'
  },
  inputs: {
    borderWidth: 1,
    borderColor:'green',
  },
  logo: {
    borderWidth: 1,
    borderColor:'#000033'
  }
}


