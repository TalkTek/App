import {
  Dimensions,
  Platform
} from 'react-native'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

export const loginStyles = {
  spinningModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalErrorMsgText: {
    marginHorizontal: 13
  },
  modalButton: {
    alignSelf: 'auto',
    backgroundColor: '#fff'
  },
  modalButtonText: {
    color: 'rgb(31, 191, 179)'
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    height: screenHeight * 0.2624,
    width: screenWidth * 0.8,
    backgroundColor: 'white',
    borderRadius: 10
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
    marginTop: screenHeight * 0.1,
    height: screenHeight * 0.224,
    width: 80,
    zIndex: 0
  },
  form: {
    borderWidth: 2,
    borderColor: 'rgb(224, 224, 224)',
    borderRadius: 8,
    marginLeft: screenWidth * 0.125,
    marginRight: screenWidth * 0.125,
    marginTop: screenHeight * 0.03,
    marginBottom: 8,
    height: screenHeight * 0.143,
    width: screenWidth * 0.75
  },
  item: {
    height: screenHeight * 0.07,
    marginLeft: 0
  },
  input: {
    height: screenHeight * 0.068,
    width: '100%',
    paddingLeft: 16,
  },
  baseButton: {
    alignSelf: 'auto',
    width: screenWidth * 0.75,
    height: screenHeight * 0.06,
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
    marginBottom: 8
  },
  loginText: {
    marginLeft: screenWidth*0.75*0.4,
    color: 'rgb(255,255, 255)'
  },
  facebookNGoogleText: {
    color: 'rgb(255, 255, 255)',
    marginLeft: 15
  },
  or: {
    fontSize: 14,
    color: 'rgb(158, 158, 158)',
    marginVertical: screenHeight * 0.04,
    letterSpacing: -0.2,
    lineHeight: 17
  },
  registerText: {
    color: 'rgb(31, 191, 179)',
    lineHeight: 21
  },
  registerButton: {
    backgroundColor: 'white'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: screenWidth * 0.75
  },
  footerButton: {
    backgroundColor: 'white'
  }
}
