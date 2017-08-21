import PlayerControl from './lib/PlayerControl'

export default class PlayerModule extends PlayerControl {
  // if have other feature to add , add it on this
}

let playerAction = () => {}
//
// playerFactory.prototype.onPress = () => {}
// playerFactory.prototype.stop = () => {}
// playerFactory.prototype.play = () => {}
// playerFactory.prototype.next = () => {}
// playerFactory.prototype.prev = () => {}
// playerFactory.prototype.seek = () => {}

let createPlayerInstance = (url) => {
  return new Player(url)
}

playerAction.prototype.isExist = (fn) => () => {
  let instance
  return instance || (instance = fn.apply(this, arguments))
}

let onPress = () => {
  Actions.AudioBarPopOut()
  Actions.ChangeColor()
  Actions.LoadAudio()
  Actions.PlayAudio()
  Actions.TimerStart()
}

let Pause = () => {
  Actions.stopAudio()
  Actions.stopTimer()
}

let Play = () => {
  Actions.playAudio()
  Actions.startTimer()
}


