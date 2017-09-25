import {
  Image,
  Dimensions
} from 'react-native'
import styled from '../../../utils/styledComponent'
import PropTypes from 'prop-types'

const {
  width: screenWidth,
} = Dimensions.get('window')

const fullWidthBanner = styled(Image, (styleProps) => ({
  resizeMode: 'cover',
  width: screenWidth,
  height: 160
}))

fullWidthBanner.propTypes = {
  styleProps: PropTypes.object
}

export default fullWidthBanner
