import React from 'react'
import { shallow } from 'enzyme'
import { PlayerButtons } from '../PlayerButtons'
import {TouchableHighlight} from 'react-native'
import renderer from 'react-test-renderer'

describe('playerButton test', () => {
  it('should render <PlayerButtons> Tag', () => {
    shallow(<PlayerButtons />)
  })

  it('should correct show list from data props', () => {
    const data = {
      backward15: {
        twoState: false,
        link: require('../../assets/img/audioElement/forward.png'),
        func: () => {}
      },
      playOrPause: {
        twoState: true,
        playLink: require('../../assets/img/playAudio/play.png'),
        pauseLink: require('../../assets/img/audioElement/pause.png'),
        func: () => {}
      },
    }
    const element = <PlayerButtons data={data} ga={{gaSetEvent: () => {}}} />
    const tree = renderer.create(element)
    const wrapper = shallow(element)
    expect(wrapper.length).toEqual(1)
    expect(tree).toMatchSnapshot()
    // expect(wrapper.children().find('TouchableHighlight').length).toEqual(1)
  })
})
