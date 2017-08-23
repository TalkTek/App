import React from 'react'
import { shallow } from 'enzyme'
import Text from '../text'
import renderer from 'react-test-renderer'

const textProps = {
  fontSize: 12,
  bold: true,
  color: '#000'
}

const textStyle = [
  { fontSize: 12, fontWeight: '700', color: '#000' },
  undefined
]

describe('<Text />', () => {
  it('should render Text Tag', () => {
    const wrapper = shallow(<Text />).dive()
    expect(wrapper.type()).toEqual('Text')
  })

  it('should have correct style', () => {
    const element = <Text {...textProps} />
    const wrapper = shallow(element).dive()
    const tree = renderer.create(element)
    expect(wrapper.prop('style')).toEqual(textStyle)
    expect(tree).toMatchSnapshot()
  })
  
  it('should have correct text color', () => {
    const element = <Text gray />
    const wrapper = shallow(element).dive()
    const tree = renderer.create(element)
    expect(wrapper.prop('style')[0].color).toEqual('rgb(158, 158, 158)')
    expect(tree).toMatchSnapshot()
  })

  test('render correct snapshot', () => {
    const tree = renderer.create(
      <Text />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})