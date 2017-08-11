import { Dimensions } from 'react-native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
export default {
  container: {
    backgroundColor: 'white',
    zIndex: 0,
  },
  banner: {
    resizeMode: 'cover',
    width: screenWidth,
    height: 160
  },
  loading: {
    height: screenHeight * 0.59,
    justifyContent: 'center'
  },
  capContainer: {
    paddingHorizontal: 16,
    paddingVertical: 0
  },
  capTitle: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomColor: 'rgb(224, 224, 224)',
    borderBottomWidth: 1
  },
  capTitleText: {
    fontSize: 15,
    color: 'rgb(33, 33, 33)'
  },
  capUnit: {
    paddingVertical: 16,
    borderBottomColor: 'rgb(224, 224, 224)',
    borderBottomWidth: 1
  },
  capPlayPauseButton: {
    marginRight: 8
  },
  capAudio: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  capPlayPauseButtonImage: {
    width: 24,
    height: 24,
    marginRight: 12
  },
  capAudioTextPlaying: {
    fontSize: 15,
    width: screenWidth * 0.65,
    color: 'rgb(31, 191, 179)',
    marginRight: 5
  },
  capAudioTextNotPlaying: {
    fontSize: 15,
    width: screenWidth * 0.65,
    marginRight: 5
  },
  audioLengthText: {
    fontSize: 13,
    color: 'rgb(158, 158, 158)'
  }
}
