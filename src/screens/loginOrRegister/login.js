// @flow
'use strict'

import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native'
import {
  Container,
  Content,
  Form,
  View,
  Input,
  Item
} from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'
import firebase from 'firebase'
import Modal from 'react-native-modalbox'
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'
import { loginStyles as styles } from './styles'
import memberAction from '../../reducer/member/memberAction'
import { Actions } from 'react-native-router-flux'
import { H2, H3, H4 } from '../../components/text'
import { Button } from '../../components/button'
import { COLORS, LAYOUT } from 'StyleConfig'

let tracker = new GoogleAnalyticsTracker('UA-100475279-1',{ test: 3})

tracker.trackScreenView('Login')

const {
  height: screenHeight,
  width: screenWidth
} = Dimensions.get('window')

@connect( state => ({
  sendMsg: state.member.sendMsg,
  sendStatus: state.member.sendStatus
}), dispatch => ({
  actions: bindActionCreators(memberAction, dispatch)
}))
export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errMsg: '',
      isOpen: false,
      spinningIsOpen: false,
    }
  }

  componentDidMount() {
    try {
      GoogleSignin.hasPlayServices({ autoResolve: true });
      GoogleSignin.configure({
        iosClientId: '483803817924-ting9fedaqcoecl7iricui9nu44m7d9o.apps.googleusercontent.com',
        webClientId: '483803817924-pv0hqspovoot6d3s74egaa9dsi533g1n.apps.googleusercontent.com',
        offlineAccess: false
      })
    } catch(err) {
      console.log('err isis', err.message);
    }
  }

  async _onFacebookLogin () {
    const { dispatch } = this.props.navigation
    const { actions } = this.props
    try {
      tracker.trackEvent('FacebookLogin', 'Click')
      setTimeout(() => this.refs.spinning.open(), 1200)

      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      if(result.isCancelled) {
        setTimeout( () => this.setState({ spinningIsOpen: false }), 1200)
      } else {
        const tokenData = await AccessToken.getCurrentAccessToken()
        const token = tokenData.accessToken.toString()
        // firebase setting
        const credential_facebook = firebase.auth.FacebookAuthProvider.credential(token)
        const user = await firebase.auth().signInWithCredential(credential_facebook)
        actions.loginMember({
          uid:user.uid, 
          post: {
            name: user.displayName,
            email: user.email,
            avatarUrl: user.photoURL,
            from: 'Facebook'
          }
        })
        Actions.tab()
      }
    } catch(error) {
      if ( error.code === "auth/account-exists-with-different-credential" ) {
        this.setState({
          errMsg: '請改用Google登入或一般登入',
          isOpen: true,
        })
        this.refs.modal.open()
      }

      this.setState({
        spinningIsOpen: false
      })
      console.error('error.credential', error.credential);
      console.error('error message is', error.message);
      console.error('error code is', error.code);
    }
  }

  async _onGoogleSignIn() {
    const { dispatch } = this.props.navigation
    const { actions } = this.props
    
    try {
      tracker.trackEvent('GoogleLogin', 'Click')
      // google setting
      const result = await GoogleSignin.signIn()
      let accessToken = result.accessToken
      let idToken = result.idToken

      // firebase google setting
      const credential_google = await firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
      const user = await firebase.auth().signInWithCredential(credential_google)

      actions.loginMember({
        uid:user.uid, 
        post: {
          name: user.displayName,
          email: user.email,
          avatarUrl: user.photoURL,
          from: 'Google'
        }
      })
      Actions.tab()
    } catch(error) {
      console.log('error message is', error.message);
      console.log('error code is', error.code);
    }
  }
  
  async _onEmailPasswordLogin () {
    const { navigate, dispatch } = this.props.navigation
    const { actions } = this.props
     actions.loginMemberEmail({
      email: this.state.email,
      password: this.state.password
    })
    tracker.trackEvent('EmailPasswordLogin', 'Fill In')
  }

  componentWillReceiveProps(nextProps) {
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
        case 'auth/wrong-password':
          errMsg = '密碼錯誤或者此信箱已綁定第三方登入'
          break
        default:
          errMsg = message
      }

      this.setState({
        errMsg,
        isOpen: true
      })
    } else if (nextProps.sendStatus === 0 ) {
      Actions.tab()
    }
  }

  render() {
    const { navigate } = this.props.navigation
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
              <Item style={{...styles.item, borderColor: 'transparent'}}>
                <Input
                  placeholder="輸入密碼"
                  style={styles.input}
                  onChangeText={text => this.setState({password: text})}
                  secureTextEntry
                />
              </Item>
            </Form>
            <View style={LAYOUT.horizontal}>
              <Button 
                text='登入'
                backgroundColor={COLORS.green}
                textColor='white'
                borderRadius={5}
                padding={10}
                fullWidth
                onPress={this._onEmailPasswordLogin.bind(this)}
              />
            </View>
            <H4 gray style={styles.or}>
              或透過第三方服務
            </H4>
            <View style={LAYOUT.horizontal}>
              <Button
                text="Facebook"
                borderRadius={5}
                fullWidth
                padding={5}
                textColor={COLORS.pureWhite}
                backgroundColor={COLORS.fbButton}
                leftElement={<Icon name="facebook-square" size={28} color="white" />}
                style={styles.socialButton}
                onPress={this._onFacebookLogin.bind(this)}
              />
            </View>
            <View style={LAYOUT.horizontal}>
              <Button
                text="Google"
                borderRadius={5}
                fullWidth
                padding={5}
                textColor={COLORS.pureWhite}
                backgroundColor={COLORS.googleButton}
                leftElement={<Icon name="google-plus" size={28} color="white" />}
                style={styles.socialButton}
                onPress={this._onGoogleSignIn.bind(this)}
              />
            </View>
            <View style={LAYOUT.horizontal}>
              <Button 
                text='註冊新帳號'
                textColor='green'
                onPress={() => navigate('register')}
              />
              <Button 
                text='忘記密碼'
                textColor='green'
                onPress={() => navigate('forgetpw')}
              />
            </View>
          </View>
          <Modal
            style={styles.modal}
            backdrop={true}
            position={'center'}
            ref={'modal'}
            backdropOpacity={0.3}
            isOpen={this.state.isOpen}
          >
              <H3 bold>登入失敗</H3>
              <H3 style={styles.modalErrorMsgText}>
                {this.state.errMsg}
              </H3>
              <Button 
                text='確認'
                textColor='green'
                style={styles.modalButton}
                padding={20}
                onPress={() => this.setState({ isOpen: !this.state.isOpen})}
              />
          </Modal>
          <Modal
            style={styles.spinningModal}
            ref={'spinning'}
            isOpen={this.state.spinningIsOpen}
          >
            <ActivityIndicator
              animating
              color='white'
              size='large'
            />
          </Modal>
        </Content>
      </Container>
    )
  }
}


