import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import { Charger } from 'types'
import {
  removeChargerFromFavorites,
  refreshFavoriteChargers,
} from 'state/actions/userActions'
import { DisplayDropdownWithError } from 'utils/inform'
import { useNavigation } from '@react-navigation/native'

const useFavorites = () => {
  const state = useSelector(selectUser)
  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  useEffect(() => {
    dispatch(refreshFavoriteChargers())
  }, [])

  /**
   * Delete charger from favorites list.
   */
  const deleteFavoriteCharger = (chargerId: number) => {
    dispatch(removeChargerFromFavorites(chargerId))
  }

  /**
   * Go to specific charger from favorite chargers.
   */
  const turnOnOnHandler = (id: number): void => {
    const charger = state?.AllChargers?.find((val: Charger) => +val.id === +id) ?? []

    if (charger) {
      navigate('ChargerDetail', { chargerDetails: charger })
    } else {
      return DisplayDropdownWithError('dropDownAlert.chargerNotExist')
    }
  }

  return {
    deleteFavoriteCharger,
    turnOnOnHandler,
  }
}

export default useFavorites
