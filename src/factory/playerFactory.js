// @flow
import {
  Player
} from 'react-native-audio-toolkit'

class PlayerFactory {

  player = undefined

  /**
   * Why I need to combine init and play into one function ?
   * the reason is the package, react-native-audio-toolkit
   * you have to immediately call play function after you call prepare function
   * otherwise you can't get the correct currentTime, the result will be -1 or 0
   * @param url : string
   * eg: 'https://firebase.......'
   */
  initAndPlay (url) {
    if(this.isPlayerExisted()) {
      this.destroy()
    }
    this.createPlayerAndPlay(url)
  }

  play () {
    this.player.play()
  }

  pause () {
    this.player.pause()
  }

  seek (pos) {
    this.player.seek(pos*1000)
  }

  nextOrPrevious (url) {
    this.init(url)
    this.play()
  }

  isPlayerExisted () {
    return typeof this.player === 'object'
  }

  createPlayerAndPlay (url) {
    this.player = new Player(url, {
      autoDestroy: false
    }).prepare(err => {
      if (err) {
        console.log('createPlayer err:', err )
      } else {
        this.play()
      }
    })
  }

  destroy () {
    this.player.destroy()
  }

  /**
   * @param audioLength :string (sec)
   * eg: '123'
   */
  currentTime () {
    let currentTimeSec = this.player.currentTime * 0.001
    let currentTimeFormatted = this.caculateFormattedTime(currentTimeSec)
    return {
      currentTimeSec,
      currentTimeFormatted
    }
  }

  /**
   * @param cT(current Time) : number
   */
  caculateFormattedTime (cT) {
    let sec = Math.floor(cT % 60)
    let min = Math.floor(cT / 60)

    if (sec < 10) { sec = `0${sec}` }
    if (min < 10) { min = `0${min}` }
    let formatted = `${min}:${sec}`

    return formatted
  }
}

let playerFactory = new PlayerFactory()

export default playerFactory
