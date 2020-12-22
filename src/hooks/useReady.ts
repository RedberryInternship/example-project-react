import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import Navigation from 'utils/navigation'
import { refreshAndCacheChargers } from 'helpers/chargers'
import { GetAllChargerResponseType, Charger } from 'types'

/**
 * Upon configuration ending, go to home screen.
 */
const useAppReady = () => {
  const { authStatus } = useSelector(selectUser)
  const [chargers, setChargers] = useState<GetAllChargerResponseType | Charger[] | undefined>()

  useEffect(() => {
    (async () => {
      const retrievedChargers = await refreshAndCacheChargers()
      setChargers(retrievedChargers)
    })()
  }, [])

  useEffect(() => {
    /**
     * Make sure that app is ready when auth status is
     * determined and chargers are loaded.
     */
    if (authStatus !== null && chargers !== undefined) {
      Navigation.navigate('MainDrawer')
    }
  }, [authStatus, chargers])
}

export default useAppReady
