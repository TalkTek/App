
let initialState = {
  playing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PLAYING_STATE':
      state = Object.assign({}, state, {
        playing: !state.playing
      })
  }
  return state
}
