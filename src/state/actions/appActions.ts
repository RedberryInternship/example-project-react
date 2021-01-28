import * as actionTypes from 'state/actionTypes/appActionTypes'
import { AppAction } from 'types'

/**
 * App is ready and can boot now.
 */
export const appIsReady = (): AppAction => ({
  type: actionTypes.READY,
  payload: true,
})
