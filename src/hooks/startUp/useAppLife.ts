import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from 'state/selectors'
import Defaults from 'utils/defaults'
import { useAppState } from '@react-native-community/hooks'
import { refreshAllChargers } from 'state/actions/userActions'
import { refreshChargingProcesses } from 'state/actions/chargingProcessActions'
import { UserState } from 'allTypes'

const useAppLife = () => {
  const userState: UserState = useSelector(selectUser)
  const dispatch = useDispatch()

  Defaults.modal = useRef(null)
  const currentAppState = useAppState()

  useEffect(() => {
    if (currentAppState === 'active') {
      if (Defaults.isForeground === false) {
        if (userState.authStatus === 'success') {
          dispatch(refreshChargingProcesses())
        }
        dispatch(refreshAllChargers())
      }
      Defaults.isForeground = true
    } else if (currentAppState.match(/inactive|background/)) {
      Defaults.isForeground = false
    }
  }, [currentAppState])

  return {
    currentAppState,
  }
}

export default useAppLife
