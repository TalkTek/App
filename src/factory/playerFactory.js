// @flow
import {
  Player
} from 'react-native-audio-toolkit'

class PlayerFactory {

  player = undefined

  init (url) {
    if(this.isPlayerExisted()) {
      this.destroy()
    } else {
      this.createPlayer(url)
    }
  }

  play () {
    this.player.play()
  }

  pause () {
    this.player.pause()
  }

  seek (pos) {
    this.player.seek(pos)
  }

  nextOrPrevious (url) {
    this.init(url)
    this.play()
  }

  isPlayerExisted () {
    return typeof this.player === 'object'
  }

  createPlayer (url) {
    this.player = new Player(url, {
      autoDestroy: false
    }).prepare()
  }


  destroy () {
    this.player.destroy()
  }

}

let playerFactory = new PlayerFactory()

export default playerFactory
