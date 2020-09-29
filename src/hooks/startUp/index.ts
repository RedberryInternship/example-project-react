import useToken from './useToken'
import useReady from './useReady'
import useAppLife from './useAppLife'
import useFirebase from './useFirebase'
import useNavigation from './useNavigation'
import useStatusBar from './useStatusBar'
import useLocalConfig from './useLocaleConfig'
import useTroubleshootNetwork from './useTroubleshootNetwork'
import useReceiveFirebaseMessage from './useReceiveFirebaseMessage'
import useDropDownInactiveBarColor from './useDropDownInactiveBarColor'

/**
 * Hear is bundle of hooks thats necessary to setup
 * at application startup.
 */
export default () => {
  useFirebase()
  const { readUserLocale, locale } = useLocalConfig()
  const { readUserToken, token } = useToken()
  useReceiveFirebaseMessage()
  useAppLife()
  useStatusBar({ readUserLocale, readUserToken })
  const { navigationState, setNavigationTopLevelElement } = useNavigation()
  const { appReady } = useReady({ navigationState, locale, token })
  useTroubleshootNetwork(readUserToken)
  const { dropDownInactiveBarColor } = useDropDownInactiveBarColor()

  return {
    setNavigationTopLevelElement,
    dropDownInactiveBarColor,
    appReady,
  }
}
