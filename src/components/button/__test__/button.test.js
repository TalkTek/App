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
    textColor: 'black'
  }

  const outPutStyle = [
    { 
      borderColor: 'rgb(158, 158, 158)',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1
    },
      undefined 
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