// @flow
'use strict'

import React, { Component } from 'react'
import {
  Image,
  Dimensions,
  Platform
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
import { NavigationActions } from 'react-navigation'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

export default class Register extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  }

  state = {
    email: '',
    password: '',
    rePassword: '',
    errMsg: '',
    isOpen: false,
  }

  async _onRegister () {
    const { email, password, rePassword } = this.state
    const { dispatch } = this.props.navigation
      if(password === rePassword) {
        let user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            firebase.database().ref(`/users/${user.uid}/profile`).set({
              name: user.displayName,
              email: user.email,
              avatarUrl: user.photoURL
            })
            dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'KnowledgeCapsuleScreen'
                  })
                ]
              })
            )
          })
          .catch(error => {
            if (error.message === 'The email address is badly formatted.') {
              this.setState({
                errMsg: 'Email或密碼不正確',
                isOpen: true
              })
            } else if (error.message === 'The email address is already in use by another account.') {
              this.setState({
                errMsg: '此信箱已經註冊過了',
                isOpen: true
              })
            } else if (error.message === 'Password should at least 6 characters') {
              this.setState({
                errMsg: '密碼至少要六位數',
                isOpen: true
              })
            }
            this.refs.modal.open()
          })
      } else {
        this.setState({
          errMsg: '密碼不一致',
          isOpen: true
        })
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
            isOpen={this.state.isOpen}
          >
              <Text style={styles.modalHeadlineText}>登入失敗</Text>
              <Text style={styles.modalErrorMsgText}>
                {this.state.errMsg}
              </Text>
              <Button style={styles.modalButton} onPress={() => this.setState({ isOpen: !this.state.isOpen})}>
                <Text style={styles.modalButtonText}>確認</Text>
              </Button>
          </Modal>

        </Content>
      </Container>
    )
  }
}

const styles = {
  modalHeadlineText: {
    marginTop: 14,
    marginBottom: 29,
    fontSize: 15,
    fontWeight: 'bold'
  },
  modalErrorMsgText: {
    marginBottom: 30,
    fontSize: 15,
  },
  modalButton: {
    alignSelf: 'auto',
    backgroundColor: '#fff'
  },
  modalButtonText: {
    color: 'rgb(31, 191, 179)',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight*0.26,
    width: screenWidth*0.8,
    backgroundColor: 'white',
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
    width: screenWidth*0.75,
    elevation: (Platform.OS ==='android') ? 0 : 3,
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


