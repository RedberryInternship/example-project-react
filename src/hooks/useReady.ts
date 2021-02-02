import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { appIsReady } from 'state/actions/appActions'
import { selectUser } from 'state/selectors'
import { refreshAndCacheChargers } from 'helpers/chargers'
import {
  preparePrivacyAndPolicyPopUp,
  hasAgreedToPrivacyAndPolicy,
} from 'helpers/privacyAndPolicy'
import { GetAllChargerResponseType, Charger } from 'types'
import defaults from 'utils/defaults'
import { retrieveLocation } from 'utils/location'

/**
 * Upon configuration ending, go to home screen.
 */
const useAppReady = () => {
  const dispatch = useDispatch()
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
      /**
       * Retrieve user location to calculate distance to each charger.
       */
      await retrieveLocation()

      const retrievedChargers = await refreshAndCacheChargers()
      setChargers(retrievedChargers)
    })()
  }, [])

  /**
   * Start app by loading map screen.
   */
  const startApp = useCallback(() => {
    defaults.authStatus = authStatus
    dispatch(appIsReady())
  }, [authStatus, dispatch])

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
         * if current route is Registration thus user is trying
         * to register and we should change route.
         */
        if (defaults.activeRoute === 'Registration') {
          return
        }

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
