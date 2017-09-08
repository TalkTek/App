import { createActions } from 'redux-actions'
import {
  CP_AUDIO_DOWNLOAD,
  CP_AUDIO_DOWNLOAD_SUCCESS,
  CP_AUDIO_DOWNLOADED_INFO_GET,
  CP_AUDIO_DOWNLOADED_INFO_GET_SUCCESS,
  CP_AUDIO_DOWNLOADED_REMOVE,
  CP_AUDIO_DOWNLOADED_REMOVE_SUCCESS
} from './downloadTypes.js'

export default createActions({
  [CP_AUDIO_DOWNLOAD]: state => state,
  [CP_AUDIO_DOWNLOAD_SUCCESS]: state => state,
  [CP_AUDIO_DOWNLOADED_INFO_GET]: state => state,
  [CP_AUDIO_DOWNLOADED_INFO_GET_SUCCESS]: state => state,
  [CP_AUDIO_DOWNLOADED_REMOVE]: state => state,
  [CP_AUDIO_DOWNLOADED_REMOVE_SUCCESS]: state => state
})
