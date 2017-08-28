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
  width: 80,
  height: 80,
  borderRadius: styleProps.borderRadius ? styleProps.borderRadius : 0,
}))

LargeThumb.propTypes = {
  styleProps: PropTypes.object
}

export default LargeThumb
