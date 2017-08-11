// @flow
export type ActionType =
    { type: 'GA_SET_SCREEN', payload: string }
  | { type: 'GA_SET_EVENT', payload: { action: string, category: string } }
