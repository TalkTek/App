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
  Form,
  View,
  Input,
  Item,
} from 'native-base'
import firebase from 'firebase'
import Modal from 'react-native-modalbox'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import memberActoion from '../../reducer/member/memberAction'
import { H3, H4 } from '../../components/text'
import { Button } from '../../components/button'
import { COLORS } from 'StyleConfig'

const { height: screenHeight, width: screenWidth }: Object = Dimensions.get('window')

@connect((state) => ({
  sendMsg: state.member.sendMsg,
  sendStatus: state.member.sendStatus
}), dispatch => ({
  register: bindActionCreators(memberActoion.createMember, dispatch)
}))

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

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.sendStatus === 2) {
      let { code, message } = nextProps.sendMsg
      let errMsg
      switch (code) {
        case 'auth/invalid-email':
          errMsg = 'Email 格式錯誤'
          break
        case 'auth/weak-password':
          errMsg = '密碼至少要六位數'
          break
        case 'auth/email-already-in-use':
          errMsg = '此信箱已經註冊過了'
          break
        default:
          errMsg = message
      }

      this.setState({
        errMsg,
        isOpen: true
      })
    }
  }

  async _onRegister () {
    const { email, password, rePassword } = this.state
    const { dispatch } = this.props.navigation
      if(password === rePassword) {
        this.props.register({
          email,
          password
        })
        //     dispatch(
        //       NavigationActions.reset({
        //         index: 0,
        //         actions: [
        //           NavigationActions.navigate({
        //             routeName: 'KnowledgeCapsuleScreen'
        //           })
        //         ]
        //       })
        //     )
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
            <Button
              text='註冊'
              backgroundColor={COLORS.green}
              textColor='pureWhite'
              fullWidth
              padding={10}
              borderRadius={5}
              style={styles.button}
              onPress={this._onRegister.bind(this)}
            />
            <Button
              text='取消'
              backgroundColor={COLORS.lightGray}
              textColor='black'
              fullWidth
              padding={10}
              borderRadius={5}
              style={styles.button}
              onPress={() => goBack()}
            />
          </View>
          <Modal
            style={styles.modal}
            backdrop={true}
            position={'center'}
            ref={"modal"}
            backdropOpacity={0.3}
            isOpen={this.state.isOpen}
          >
              <H4 style={styles.modalHeadlineText}>登入失敗</H4>
              <H4 style={styles.modalErrorMsgText}>
                {this.state.errMsg}
              </H4>
              <Button
                text='確認'
                textColor='green'
                textSize='H4'
                onPress={() => this.setState({ isOpen: !this.state.isOpen})}
              />
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
    backgroundColor: COLORS.pureWhite
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight*0.26,
    width: '80%',
    backgroundColor: COLORS.pureWhite,
    borderRadius: 10,
  },
  container: {
    backgroundColor: COLORS.pureWhite
  },
  bg: {
    height: screenHeight,
    alignItems: 'center',
    width: '75%',
    alignSelf: 'center'
  },
  logo: {
    marginTop: 68,
    width: 80
  },
  form: {
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    marginTop: 40,
    marginBottom: 8,
    width: '100%'
  },
  item: {
    marginLeft: 0
  },
  input: {
    height: 48,
    width: '100%',
    paddingLeft: 16,
  },
  button: {
    marginBottom: 8
  }
}
