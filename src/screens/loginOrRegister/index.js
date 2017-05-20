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
                <Input placeholder="輸入Email" style={styles.input}/>
              </Item>
              <Item style={{...styles.item, borderColor: 'transparent'}}>
                <Input placeholder="輸入密碼" maxLength={1} style={styles.input}/>
              </Item>
            </Form>
            <Button style={{...styles.baseButton, ...styles.loginButton}}>
              <Text style={styles.loginText}>
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
  logo: {
    marginTop: 68,
    height: 150,
    width: 80,
  },
  form: {
    alignSelf: 'stretch',
    borderWidth: 1.5,
    borderColor:'rgb(224, 224, 224)',
    borderRadius: 8,
    marginLeft: screenWidth*0.125,
    marginRight: screenWidth*0.125,
    marginTop: 40,
    marginBottom: 8,
    height: 96,
    width: screenWidth*0.75,
  },
  item: {
    height: 48,
    marginLeft: 0,
  },
  input: {
    height: 45,
    width: '100%',
    paddingLeft: 16,
  },
  baseButton: {
    alignSelf: 'auto',
    width: screenWidth*0.75,
  },
  loginButton: {
    backgroundColor: 'rgb(31, 191, 179)',
  },
  loginText: {
    marginLeft: screenWidth*0.75*0.4,
    fontSize: 15,
    fontWeight: '900',
    height: 21,
    width: 40,
  },
}


