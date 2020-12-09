import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import { Navigation, Charger } from 'allTypes'
import {
  removeChargerFromFavorites,
  refreshFavoriteChargers,
} from 'state/actions/userActions'
import { DisplayDropdownWithError } from 'helpers/inform'

const useFavorites = ({ navigate }: Navigation) => {
  const state = useSelector(selectUser)
  const dispatch = useDispatch()

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
