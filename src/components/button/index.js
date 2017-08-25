import styled from '../../utils/styledComponent'
import DefaultButoton from './defaultButton'

const Button = styled(DefaultButoton, (styleProps: {}) => {
  // console.log(styleProps)
  let borderStyle = styleProps.border? {
    borderColor: 'rgb(158, 158, 158)',
    borderWidth: Number(styleProps.border)
  }: {}
  return {
    borderColor: styleProps.borderColor,
    borderRadius: styleProps.borderRadius,
    backgroundColor: styleProps.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    ...borderStyle
  }
})

export { Button }
