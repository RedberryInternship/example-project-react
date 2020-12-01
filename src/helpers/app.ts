import defaults from 'utils/defaults'

/**
 * Determine if app is in foreground.
 */
export const isAppInForeground = () => defaults.isForeground === true

/**
 * Determine if app is in background.
 */
export const isAppInBackground = () => defaults.isForeground === false

/**
 * Set app in foreground.
 */
export const setAppInForeground = () => {
  defaults.isForeground = true
}

/**
 * Set app in background.
 */
export const setAppInBackground = () => {
  defaults.isForeground = false
}
