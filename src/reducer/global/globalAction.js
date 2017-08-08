import { createActions } from 'redux-actions'

export default createActions({
  'SETTING_VIEW_OFFSET': (x, y) => ({
    x,
    y
  })
})
