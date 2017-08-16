import {
  Image,
  Dimensions
} from 'react-native'
import styled from '../../../utils/styledComponent'
import PropTypes from 'prop-types'

const {
  width: screenWidth
} = Dimensions.get('window')

const LargeThumb = styled(Image, (styleProps) => ({
  resizeMode: 'cover',
  width: screenWidth,
  height: 160
}))

LargeThumb.propTypes = {
  styleProps: PropTypes.object
}

export default LargeThumb
