import { useState } from 'react'
import NavigationActions from 'utils/navigation.service'

const useNavigation = () => {
  const [navigationState, setNavigationState] = useState(false)
  const setNavigationTopLevelElement = (ref: any): void => {
    if (ref != null) {
      NavigationActions.setTopLevelNavigator(ref)
      setNavigationState(true)
    }
  }

  return {
    navigationState,
    setNavigationTopLevelElement,
  }
}

export default useNavigation
