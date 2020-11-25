import { useEffect, useRef, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from 'state/selectors'
import Defaults from 'utils/defaults'
import { useAppState } from '@react-native-community/hooks'
import { refreshAllChargers } from 'state/actions/userActions'
import { chargingState } from 'hooks/actions/chargerActions'
import ChargersContext from 'hooks/contexts/charger'
import { UserState } from 'allTypes'

const useAppLife = () => {
  const chargersContext = useContext(ChargersContext)
  const userState: UserState = useSelector(selectUser)
  const userDispatch = useDispatch()
  const chargerDispatch = chargersContext.dispatch

  Defaults.modal = useRef(null)
  const currentAppState = useAppState()

  useEffect(() => {
    (async () => {
      if (currentAppState === 'active') {
        if (Defaults.isForeground === false) {
          if (userState.authStatus === 'success') {
            chargingState(chargerDispatch)
          }
          userDispatch(refreshAllChargers())
        }
        Defaults.isForeground = true
      } else if (currentAppState.match(/inactive|background/)) {
        Defaults.isForeground = false
      }
    })()
  }, [currentAppState])

  return {
    currentAppState,
  }
}

export default useAppLife
