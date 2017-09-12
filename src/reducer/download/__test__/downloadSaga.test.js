import { testSaga, expectSaga } from 'redux-saga-test-plan'
import { downloadSaga } from '../downloadSaga'
import {
    CP_AUDIO_DOWNLOAD,
    CP_AUDIO_DOWNLOAD_SUCCESS,
    CP_AUDIO_DOWNLOAD_FAILURE,
    CP_AUDIO_DOWNLOADED_INFO_GET,
    CP_AUDIO_DOWNLOADED_INFO_GET_SUCCESS,
    CP_AUDIO_DOWNLOADED_INFO_GET_FAILURE,
    CP_AUDIO_DOWNLOADED_REMOVE,
    CP_AUDIO_DOWNLOADED_REMOVE_SUCCESS,
    CP_AUDIO_DOWNLOADED_REMOVE_FAILURE
  } from '../downloadTypes'

it('should pick the correct flow', () => {
  return expectSaga(downloadSaga)
  .put({type: CP_AUDIO_DOWNLOAD_SUCCESS, payload: { capsules: {} }})
  .dispatch({type: CP_AUDIO_DOWNLOADED_REMOVE, payload: {}})
  .run()
})
