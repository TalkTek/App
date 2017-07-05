import { Dimensions } from 'react-native'

const {
  height: screenHeight,
  width: screenWidth
} = Dimensions.get('window')

export default {
  container: {
    backgroundColor: 'white'
  },
  banner: {
    flex: 1,
    height: screenHeight * 0.34,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  footer: {
    flex: 1,
    flexDirection: 'row'
  }
}
