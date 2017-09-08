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
  Text,
  Input,
  Item
} from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from 'firebase'
import Modal from 'react-native-modalbox'
import MemberAction from '../../reducer/member/memberAction'
import { SubTitle, ThirdTitle, H3, H4 } from '../../components/text'
import { Button } from '../../components/button'
import { COLORS } from 'StyleConfig'
// import { FIREBASE_CONFIG } from '../../lib/config'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
// firebase.initializeApp(FIREBASE_CONFIG)

@connect(state => ({
  sendStatus: state.member.sendStatus,
  sendMsg: state.member.sendMsg
}), dispatch => ({
  sendResetPasswordEmail: bindActionCreators(MemberAction.sendResetPasswordEmail, dispatch)
}))

export default class Forgetpw extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  }

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      errMsg: '',
      isOpen: false,
    }
  }

  async _Resetpw () {
    const { email } = this.state
    const { navigate } = this.props.navigation
    this.props.sendResetPasswordEmail(email)
  }

  componentWillReceiveProps(nextProps) {
    const { navigate } = this.props.navigation
    if (nextProps.sendStatus === 2) {
      let { code, message } = nextProps.sendMsg
      let errMsg
      switch (code) {
        case 'auth/invalid-email':
          errMsg = '不當的email格式'
          break
        case 'auth/user-not-found':
          errMsg = '沒有此使用者'
          break
        default:
          errMsg = message
      }

      this.setState({
        errMsg,
        isOpen: true
      })
    } else if (nextProps.sendStatus === 0) {
      navigate('Login')
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
            </Form>
            <Button 
              text='重設'
              backgroundColor={COLORS.green}
              textColor='pureWhite'
              fullWidth
              padding={12}
              borderRadius={5}
              textSize='H4'
              style={styles.button}
              onPress={this._Resetpw.bind(this)}
            />
            <Button 
              text='取消'
              backgroundColor={COLORS.lightGray}
              textColor='black'
              fullWidth
              padding={12}
              borderRadius={5}
              textSize='H4'
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
              <H3 bold style={styles.modalHeadlineText}>重設失敗</H3>
              <H3 style={styles.modalErrorMsgText}>
                {this.state.errMsg}
              </H3>
              {/* <Button style={styles.modalButton} onPress={() => this.setState({ isOpen: !this.state.isOpen})}>
                <H3 bold style={styles.modalButtonText}>確認</H3>
              </Button> */}
              <Button 
                text='確認'
                textColor='green'
                onPress={() => this.setState({ isOpen: !this.state.isOpen })}
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
    marginBottom: 29
  },
  modalErrorMsgText: {
    marginBottom: 30
  },
  modalButton: {
    alignSelf: 'auto',
    backgroundColor: '#fff'
  },
  modalButtonText: {
    color: 'rgb(31, 191, 179)'
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
    width: '100%',
    paddingLeft: 16,
  },
  button: {
    marginBottom: 10
  }
}


