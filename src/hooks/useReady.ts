import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import Navigation from 'utils/navigation'
import { refreshAndCacheChargers } from 'helpers/chargers'
import {
  preparePrivacyAndPolicyPopUp,
  hasAgreedToPrivacyAndPolicy,
} from 'helpers/privacyAndPolicy'
import { GetAllChargerResponseType, Charger } from 'types'
import defaults from 'utils/defaults'
/**
 * Upon configuration ending, go to home screen.
 */
const useAppReady = () => {
  const { authStatus } = useSelector(selectUser)
  const [chargers, setChargers] = useState<GetAllChargerResponseType | Charger[] | undefined>()

  useEffect(() => {
    /**
     * Update defaults authStatus.
     */
    defaults.authStatus = authStatus
  }, [authStatus])

  useEffect(() => {
    /**
     * Retrieve chargers before start up.
     */
    (async () => {
      const retrievedChargers = await refreshAndCacheChargers()
      setChargers(retrievedChargers)
    })()
  }, [])

  /**
   * Start app by loading map screen.
   */
  const startApp = useCallback(() => {
    defaults.authStatus = authStatus
    Navigation.navigate('MainDrawer')
  }, [authStatus])

  useEffect(() => {
    /**
     * Make sure that app is ready when auth status is
     * determined and chargers are loaded.
     */

    (async () => {
      if (authStatus !== null && chargers !== undefined) {
        /**
         * Determine if user has already agreed privacy and policy.
         */
        const hasAgreed = await hasAgreedToPrivacyAndPolicy()

        /**
         * If user is authenticated and hasn't yet agreed
         * to privacy and policy then give him/her the pop up.
         */
        if (authStatus === 'success' && !hasAgreed) {
          preparePrivacyAndPolicyPopUp(startApp)
        } else {
          startApp();
        }
      }
    })()
  }, [authStatus, chargers, startApp])
}

export default useAppReady
