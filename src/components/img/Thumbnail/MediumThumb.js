import {
  Image,
  Dimensions
} from 'react-native'
import styled from '../../../utils/styledComponent'
import PropTypes from 'prop-types'

const {
  width: screenWidth
} = Dimensions.get('window')

const MediumThumb = styled(Image, (styleProps) => ({
  width: 48,
  height: 48,
  borderRadius: styleProps.borderRadius ? styleProps.borderRadius : 0
}))

MediumThumb.propTypes = {
  styleProps: PropTypes.object
}

export default MediumThumb
