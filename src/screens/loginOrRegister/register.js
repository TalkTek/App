// @flow
'use strict'

import React, { Component } from 'react'
import {
  Image,
  Dimensions,
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
import firebase from 'firebase'
import Modal from 'react-native-modalbox'
// import { FIREBASE_CONFIG } from '../../lib/config'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
// firebase.initializeApp(FIREBASE_CONFIG)

export default class Register extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      rePassword: ''
    }
  }

  async _onRegister () {
    let errMsg
    const { email, password, rePassword } = this.state
    try {
      if(password === rePassword) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
      } else {
        errMsg = "密碼不ㄧ致"
        Toast.show({
          supportedOrientations: ['portrait'],
          text: errMsg,
          position: 'center',
          buttonText: 'X',
          type: 'warning',
        })
      }
    }
    catch (error) {
      if (error.message === 'The email address is badly formatted.') {
        errMsg = "錯誤的信箱格式"
      } else if (error.message === 'The email address is already in use by another account.') {
        errMsg = "此信箱已經被註冊過了"
      }
      this.refs.modal.open()
      // Toast.show({
      //   supportedOrientations: ['portrait'],
      //   text: errMsg,
      //   position: 'center',
      //   buttonText: 'X',
      //   type: 'warning',
      // })
      console.log(error.message)
    }
  }

  render() {
    const { goBack } = this.props.navigation
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.bg}>
            <Image source={require('../../assets/img/logo.png')} style={styles.logo} />
            <Form style={styles.form}>
              <Item style={styles.item}>
                <Input
                  placeholder="輸入Email"
                  style={styles.input}
                  onChangeText={text => this.setState({email: text})}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              </Item>
              <Item style={styles.item}>
                <Input
                  placeholder="輸入密碼"
                  style={styles.input}
                  onChangeText={text => this.setState({password: text})}
                  secureTextEntry
                />
              </Item>
              <Item style={{...styles.item, borderColor: 'transparent'}}>
                <Input
                  placeholder="請再輸入密碼"
                  style={styles.input}
                  onChangeText={text => this.setState({rePassword: text})}
                  secureTextEntry
                />
              </Item>
            </Form>
            <Button style={{...styles.baseButton, ...styles.registerButton}} onPress={this._onRegister.bind(this)}>
              <Text style={styles.registerText}>
                註冊
              </Text>
            </Button>
            <Button style={{...styles.baseButton, ...styles.cancelButton}} onPress={() => goBack()}>
              <Text style={styles.cancelText}>
                取消
              </Text>
            </Button>
          </View>

          <Modal
            style={styles.modal}
            backdrop={true}
            position={'center'}
            ref={"modal"}
            backdropOpacity={0.3}
          >
            <Text style={styles.text}>
              Modal on top
            </Text>
          </Modal>

        </Content>
      </Container>
    )
  }
}

const styles = {
  text: {
    fontSize: 15,
    color: 'white'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight*0.2,
    width: screenWidth*0.7,
    backgroundColor: 'rgb(31, 191, 179)',
    borderRadius: 10,
  },
  container: {
    backgroundColor: 'rgb(255, 255, 255)'
  },
  bg: {
    flex: 1,
    height: screenHeight,
    alignItems: 'center'
  },
  logo: {
    marginTop: 68,
    height: 150,
    width: 80
  },
  form: {
    borderWidth: 2,
    borderColor:'rgb(224, 224, 224)',
    borderRadius: 8,
    marginLeft: screenWidth*0.125,
    marginRight: screenWidth*0.125,
    marginTop: 40,
    marginBottom: 8,
    height: 144,
    width: screenWidth*0.75
  },
  item: {
    height: 48,
    marginLeft: 0
  },
  input: {
    height: 45,
    width: '100%',
    paddingLeft: 16,
  },
  baseButton: {
    alignSelf: 'auto',
    width: screenWidth*0.75
  },
  registerButton: {
    backgroundColor: 'rgb(31, 191, 179)',
    marginBottom: 8
  },
  cancelButton: {
    backgroundColor: 'rgb(224, 224, 224)',
  },
  registerText: {
    marginLeft: screenWidth*0.75*0.4,
    fontSize: 15,
    fontWeight: '900',
    height: 21,
    width: 40
  },
  cancelText: {
    marginLeft: screenWidth*0.75*0.4,
    color: 'rgb(33, 33 ,33)',
    fontSize: 15,
    fontWeight: '900',
    height: 21,
    width: 40
  },
}


