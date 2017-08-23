import React from 'react'
import { shallow } from 'enzyme'
import { FooterButtons } from '../FooterButtons'
import renderer from 'react-test-renderer'

describe('playAudio/component/FooterButtons test', () => {
  let data = {
    good: {
      notActive: require('../../assets/img/playAudio/good.png'),
      active: require('../../assets/img/playAudio/goodActive.png'),
      checkActive: 'audioIsGood',
      name: 'likeCounter',
      func: () => {}
    }
  }

  it('should render a <FooterButtons> tag', () => {
    const wrapper = shallow(<FooterButtons />)
    expect(wrapper.find('View').length).toEqual(1)
    expect(wrapper.find('TouchableHighlight').length).toEqual(0)
  })

  it('should render same length item', () => {
    const element = <FooterButtons data={data} />
    const wrapper = shallow(element)
    const tree = renderer.create(element)
    expect(wrapper.find('TouchableHighlight').length).toEqual(1)
    expect(tree).toMatchSnapshot()
  })
})