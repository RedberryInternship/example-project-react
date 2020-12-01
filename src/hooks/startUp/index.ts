import useAppReady from './useReady'
import useReadToken from './useReadToken'
import useAppLife from './useAppLife'
import useFirebase from './useFirebase'
import useStatusBar from './useStatusBar'
import useLocalConfig from './useLocaleConfig'
import useTroubleshootNetwork from './useTroubleshootNetwork'
import useReceiveFirebaseMessage from './useReceiveFirebaseMessage'

/**
 * Hear is bundle of hooks thats necessary to setup
 * at application startup.
 */
export default () => {
  useFirebase()
  useLocalConfig()
  useReadToken()
  useReceiveFirebaseMessage()
  useAppLife()
  useStatusBar()
  useTroubleshootNetwork()
  useAppReady()
}
