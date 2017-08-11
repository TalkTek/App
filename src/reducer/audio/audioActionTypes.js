// @flow

export type ActionTypes = 
     { type: 'CHANGE_PLAYING_STATE', payload: string }
  |  { type: 'CP_AUDIO_STORE', payload: Array<{ audios: [], title: string }> }
  |  { type: 'SETTING_PLAYING_AUDIO_INFO', payload: { currentTime: Object, from: string, id: string, name: string, pos: Object, url: string, parentKey: string } }
  |  { type: 'LOAD_CP_AUDIO_SUCCESS' }
  |  { type: 'CP_AUDIO_GOOD_CHANGE', payload: { capsulesId: string, isGood: boolean, parentKey: string, userId: string } }
  |  { type: 'CP_AUDIO_GOOD_CHANGE_SUCCESS', payload: { isGood: boolean, likeCounter: number } }
  |  { type: 'CP_AUDIO_INFO_GET', payload: { capsuleId: string, memberUid: string, parentKey: string } }
  |  { type: 'CP_AUDIO_INFO_GET_SUCCESS', payload: { audioIsGood: boolean, draft: string, id: string, length: Object, likeCounter: number } }
  |  { type: 'CP_AUDIO_GET_DOC', payload: { capsuleId: string, parentKey: string } }
  |  { type: 'CP_AUDIO_GET_DOC_SUCCESS', payload: { draft: string } }
  |  { type: 'TOGGLE_AUDIO_POPOUT_BAR', payload: { isAudioPopOutBarActive: boolean } }
