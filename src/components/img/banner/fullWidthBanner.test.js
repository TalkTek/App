import React from 'react'
import { shallow } from 'enzyme'
import { Dimensions } from 'react-native'

import FullWidthBanner from './fullWidthBanner'

const {
  width: screenWidth
} = Dimensions.get('window')

const source = require('../../../assets/img/bubu.png')
const marginLeft = 30
const style = [{
  resizeMode: 'cover',
  width: screenWidth,
  height: 160
}, undefined]

const renderComponent = () => shallow(
  <FullWidthBanner
    source={source}
    marginLeft={marginLeft}
  />
).dive()

describe('<fullWidthBanner />', () => {
  it('should render an <Image> tag', () => {
    const wrapper = renderComponent()
    expect(wrapper.type()).toEqual('Image')
  })
  it('should have an source props', () => {
    const wrapper = renderComponent()
    expect(wrapper.prop('source')).toEqual(source)
  })

  it('should have an marginLeft props', () => {
    const wrapper = renderComponent()
    expect(wrapper.prop('marginLeft')).toEqual(marginLeft)
  })
  it('should have an correct styles', () => {
    const wrapper = renderComponent()
    expect(wrapper.prop('style')).toEqual(style)
  })
})
