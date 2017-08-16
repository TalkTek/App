import React from 'react'
import { shallow } from 'enzyme'
import SmallIcon from '../SmallIcon'

// fake property
const source = require('../../../../assets/img/bubu.png')
const marginLeft = 30
const style = [{
  width: 24,
  height: 24,
  marginLeft: 30,
  marginRight: 0,
  marginBottom: 0,
  marginTop: 0
}, undefined]

const renderComponent = () => shallow(
  <SmallIcon
    source={source}
    marginLeft={marginLeft}
  />
).dive()

describe('<SmallIcon />', () => {
  it('should render an <Image> tag', () => {
    const wrapper = renderComponent()
    expect(wrapper.type()).toEqual('Image')
  })
  it('should have an source props', () => {
    const wrapper = renderComponent()
    expect(wrapper.prop('source')).toEqual(source)
  })
  it('should have an change on marginLeft prop if we pass marginLeft value', () => {
    const wrapper = renderComponent()
    expect(wrapper.prop('marginLeft')).toEqual(marginLeft)
  })
  it('should have an correct original styles', () => {
    const wrapper = renderComponent()
    expect(wrapper.prop('style')).toEqual(style)
  })
})
