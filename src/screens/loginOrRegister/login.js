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
  Button,
  Form,
  View,
  Text,
  Input,
  Item,
} from 'native-base'
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'
import firebase from 'firebase'
import Modal from 'react-native-modalbox'
import { NavigationActions } from 'react-navigation'
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'

let tracker = new GoogleAnalyticsTracker('UA-100475279-1',{ test: 3})

tracker.trackScreenView('Login')

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

export default class Login extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  }

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
        iosClientId: '430072955636-0c50m0rcd61fcue597jrbir12oagc65t.apps.googleusercontent.com',
        webClientId: '430072955636-kh5mh67btr7khp4pml100f42rjprovlm.apps.googleusercontent.com',
        offlineAccess: false
      })
    } catch(err) {
      console.log('err isis', err.message);
    }
  }

  async _onFacebookLogin () {
    const { dispatch } = this.props.navigation
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

        // write firebase
        firebase.database().ref(`/users/${user.uid}/profile`).set({
          name: user.displayName,
          email: user.email,
          avatarUrl: user.photoURL,
          from: 'Facebook'
        })

        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'TalkList'})
          ]
        }))
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
      console.log('error.credential', error.credential);
      console.log('error message is', error.message);
      console.log('error code is', error.code);
    }
  }

  async _onGoogleSignIn() {
    const { dispatch } = this.props.navigation
    try {
      tracker.trackEvent('GoogleLogin', 'Click')
      // google setting
      const result = await GoogleSignin.signIn()
      let accessToken = result.accessToken
      let idToken = result.idToken

      // firebase google setting
      const credential_google = await firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
      const user = await firebase.auth().signInWithCredential(credential_google)

      firebase.database().ref(`/users/${user.uid}/profile`).set({
        name: user.displayName,
        email: user.email,
        avatarUrl: user.photoURL,
        from: 'Google'
      })

      dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'TalkList'})
        ]
      }))
    } catch(error) {
      console.log('error message is', error.message);
      console.log('error code is', error.code);

    }
  }
  
  async _onEmailPasswordLogin () {
    const { navigate } = this.props.navigation
    try {
      let user = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      firebase.database().ref(`/users/${user.uid}/profile`).set({
        name: user.displayName,
        email: user.email,
        avatarUrl: user.photoURL
      })
      
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'TalkList'})
        ]
      }))
      tracker.trackEvent('EmailPasswordLogin', 'Fill In')
    }
    catch(error) {
      if (error.message === 'The email address is badly formatted.') {
        this.setState({
          errMsg: 'Email格式不正確',
          isOpen: true
        })
      } else if ( error.code === 'auth/user-not-found' ) {
        this.setState({
          errMsg: '無此帳號',
          isOpen: true
        })
      } else {
        this.setState({
          errMsg: error.message,
          isOpen: true
        })
      }
    }
    this.refs.modal.open()
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
            <Button
              style={{...styles.baseButton, ...styles.loginButton}}
              onPress={this._onEmailPasswordLogin.bind(this)}
            >
              <Text style={styles.loginText}>
                登入
              </Text>
            </Button>
            <Text style={styles.or}>
              或透過第三方服務
            </Text>
            <Button style={{...styles.baseButton, ...styles.facebookButton}} onPress={this._onFacebookLogin.bind(this)}>
              <Icon name="facebook-square" size={28} color="white" />
              <Text style={styles.facebookNGoogleText}>Facebook</Text>
            </Button>
            <Button style={{...styles.baseButton, ...styles.googleButton}} onPress={this._onGoogleSignIn.bind(this)}>
              <Icon name="google-plus" size={28} color="white" />
              <Text style={styles.facebookNGoogleText}>Google</Text>
            </Button>
            <Button style={{...styles.baseButton, ...styles.registerButton}} onPress={() => navigate('Register')}>
              <Text style={styles.registerText}>註冊新帳號</Text>
            </Button>
            <Button style={{...styles.baseButton, ...styles.registerButton}} onPress={() => navigate('Forgetpw')}>
              <Text style={styles.registerText}>忘記密碼</Text>
            </Button>
          </View>
          <Modal
            style={styles.modal}
            backdrop={true}
            position={'center'}
            ref={'modal'}
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

const styles = {
  spinningModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeadlineText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalErrorMsgText: {
    fontSize: 16,
    marginHorizontal: 13,
  },
  modalButton: {
    alignSelf: 'auto',
    backgroundColor: '#fff',
  },
  modalButtonText: {
    color: 'rgb(31, 191, 179)',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    height: screenHeight*0.2624,
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
    alignItems: 'center',
  },
  logo: {
    marginTop: 68,
    height: 150,
    width: 80,
    zIndex: 0,
  },
  form: {
    borderWidth: 2,
    borderColor:'rgb(224, 224, 224)',
    borderRadius: 8,
    marginLeft: screenWidth*0.125,
    marginRight: screenWidth*0.125,
    marginTop: 40,
    marginBottom: 8,
    height: 96,
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
    elevation: (Platform.OS === 'android') ? 0 : 3,
  },
  loginButton: {
    backgroundColor: 'rgb(31, 191, 179)',
  },
  facebookButton: {
    backgroundColor: 'rgb(58, 88, 151)',
    justifyContent: 'center',
    marginBottom: 8
  },
  googleButton: {
    backgroundColor: 'rgb(221, 77, 64)',
    justifyContent: 'center',
    marginBottom: 16
  },
  loginText: {
    marginLeft: screenWidth*0.75*0.4,
    fontSize: 15,
    fontWeight: '900',
    height: 21,
    width: 40
  },
  facebookNGoogleText: {
    fontSize: 15,
    marginLeft: 16,
    letterSpacing: 0,
    fontWeight: '600'
  },
  or: {
    fontSize: 14,
    color: 'rgb(158, 158, 158)',
    marginTop: 24,
    marginBottom: 24,
    letterSpacing: -0.2,
    lineHeight: 17
  },
  registerText: {
    fontSize: 15,
    color: 'rgb(31, 191, 179)',
    fontWeight: 'bold',
    lineHeight: 21
  },
  registerButton: {
    backgroundColor: 'white',
    justifyContent: 'center'
  },
}


