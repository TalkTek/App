// @flow
export type ActionType = 
{ type: 'DOWNLOAD_CP_AUDIO_SUCCESS', payload: { capsules: Object } }
| { type: 'GET_DOWNLOADED_CP_AUDIO_SUCCESS', payload: { capsules: Object } }
| { type: 'REMOVE_DOWNLOADED_CP_AUDIO_SUCCESS', payload: { capsules: Object } }
