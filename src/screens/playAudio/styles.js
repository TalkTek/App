import { Dimensions } from 'react-native'
import { COLORS } from 'StyleConfig'

const {
  height: screenHeight,
  width: screenWidth
} = Dimensions.get('window')

export default {
  container: {
    backgroundColor: COLORS.pureWhite
  },
  header: {
    backgroundColor: COLORS.pureWhite,
    borderBottomWidth: 0
  },
  banner: {
    resizeMode: 'contain',
    height: screenHeight * 0.34,
    width: screenWidth
  },
  body: {
    height: 290,
    paddingHorizontal: screenWidth * 0.085,
    paddingTop: 24,
    alignItems: 'center'
  },
  title: {
    marginBottom: 16
  },
  audioType: {
    marginBottom: 20
  },
  slider: {
    width: screenWidth * 0.83,
    marginBottom: 10
  },
  track: {
    height: 2,
    borderRadius: 2,
    backgroundColor: COLORS.trackBarBackground
  },
  trackThumb: {
    top: 22,
    width: 20,
    height: 20,
    borderRadius: 30 / 2,
    backgroundColor: COLORS.white,
    borderColor: COLORS.green,
    borderWidth: 2
  },
  sliderTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    height: 75
  }
}
