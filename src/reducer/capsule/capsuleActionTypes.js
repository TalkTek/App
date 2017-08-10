// @flow

export type ActionType = 
    { type: 'LOAD_CP_AUDIO', payload: { lastKey: string | null, limitToLast: number } }
  | { type: 'CAPSULE_SET_LASTKEY', payload: { lastKey: string | null } }
