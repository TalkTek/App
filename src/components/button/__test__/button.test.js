import React from 'react'
import renderer from 'react-test-renderer'
import { Button } from '../index'
import { shallow } from 'enzyme'

describe('<Button />', () => {
  it('should render <Button /> elemnet without error', () => {
    shallow(<Button />).dive()
  })

  const testProps = {
    border: 1,
    text: 'just a text',
    borderRadius: 5,
    textColor: 'black',
    fullWidth: true
  }

  const outPutStyle = [
    [{"alignItems": "center", "backgroundColor": undefined, "borderColor": "rgb(158, 158, 158)", "borderRadius": 5, "borderWidth": 1, "justifyContent": "center", "padding": undefined, "width": "100%"}, undefined], 
    {"flexDirection": "row", "flexWrap": "wrap", "justifyContent": "space-between"}, 
    {"justifyContent": "center"}
  ]

  it('should render a correct style button', () => {
    const wrapper = shallow(<Button {...testProps} />).dive()
    expect(wrapper.prop('style')).toEqual(outPutStyle)
  })

  test('render output should be same with expect', () => {
    const tree = renderer.create(<Button {...testProps}/>)
    expect(tree).toMatchSnapshot()
  })

})