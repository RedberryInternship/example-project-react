import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import { DisplayDropdownWithError } from 'utils/inform'
import { useNavigation } from '@react-navigation/native'
import {
  HomeNavigateModes,
  Charger,
} from 'types'

export default () => {
  const { navigate } = useNavigation()
  const state = useSelector(selectUser)
  const [chargerWithCode, setChargerWithCode] = useState<string>('')

  /**
   * Select charger handler upon
   * charger search by code.
   */
  const findCharger = () => {
    /**
     * Warn on empty input click.
     */
    if (chargerWithCode === '') {
      return DisplayDropdownWithError('dropDownAlert.fillCode')
    }

    /**
     * Find charger.
     */
    const charger = state
      .AllChargers
      ?.find(
        (val: Charger) => val.code?.toString() === chargerWithCode,
      )

    if (!charger) {
      return DisplayDropdownWithError('dropDownAlert.chargerNotExist')
    }
    navigateToChargerDetailScreen(charger)
  }

  /**
   * Navigate to chargers detail screen.
   */
  const navigateToChargerDetailScreen = (charger: Charger): void => {
    navigate('ChargerDetail', { chargerDetails: charger, from: 'ChargerWithCode' })
  }

  /**
   * Navigate to home and display chargers listing.
   */
  const allChargerHandler = (): void => {
    navigate('Home', { mode: HomeNavigateModes.showAllChargers })
  }

  return {
    navigateToChargerDetailScreen,
    setChargerWithCode,
    allChargerHandler,
    findCharger,
  }
}
