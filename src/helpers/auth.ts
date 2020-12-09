import Defaults from 'utils/defaults'

/**
 * Determine if user is authenticated.
 *
 * @returns {boolean}
 */
export const isAuthenticated = (): boolean => !!Defaults.token
