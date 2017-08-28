import React from 'react'
import { shallow } from 'enzyme'

import MediumThumb from '../MediumThumb'

// fake data
const source = require('../../../../assets/img/bubu.png')
const style = [{
  width: 48,
  height: 48,
  borderRadius: 20
}, undefined]
const borderRadius = 20

const renderComponent = () => shallow(
  <MediumThumb
    source={source}
    borderRadius={borderRadius}
  />
).dive()

describe('<MediumThumb />', () => {
  it('should render an <Image> tag ', () => {
    const wrapper = renderComponent()
    expect(wrapper.type()).toEqual('Image')
  })
  it('should have an source props', () => {
    const wrapper = renderComponent()
    expect(wrapper.prop('source')).toEqual(source)
  })
  it('should have an change on borderRadius prop if we pass borderRadius value', () => {
    const wrapper = renderComponent()
    expect(wrapper.prop('borderRadius')).toEqual(borderRadius)
  })
  it('should have an correct original styles', () => {
    const wrapper = renderComponent()
    expect(wrapper.prop('style')).toEqual(style)
  })
})
