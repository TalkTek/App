import {
  Image,
  Dimensions
} from 'react-native'
import styled from '../../../utils/styledComponent'
import PropTypes from 'prop-types'

const {
  width: screenWidth
} = Dimensions.get('window')

const SmallThumb = styled(Image, (styleProps) => ({
  width: 32,
  height: 32,
  borderRadius: styleProps.borderRadius ? styleProps.borderRadius : 0
}))

SmallThumb.propTypes = {
  styleProps: PropTypes.object
}

export default SmallThumb
