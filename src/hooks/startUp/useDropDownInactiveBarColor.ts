import { useCallback } from 'react'
import { StatusBarStyle } from 'react-native'
import { determineTimePeriod } from 'utils/mapAndLocation/mapFunctions'
import Defaults from 'utils/defaults'

const useDropDownInactiveBarColor = () => {
  const dropDownInactiveBarColor = useCallback((): StatusBarStyle => {
    if (Defaults.activeRoute !== 'Home') {
      return 'light-content'
    } else {
      return determineTimePeriod() ? 'dark-content' : 'light-content'
    }
  }, [determineTimePeriod, Defaults])

  return {
    dropDownInactiveBarColor,
  }
}

export default useDropDownInactiveBarColor
