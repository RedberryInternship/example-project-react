import React from 'react'
import { useDispatch } from 'react-redux'
import {
  useReceiveFirebaseMessage,
  useTroubleshootNetwork,
  useLocaleConfig,
  useReadToken,
  useStatusBar,
  useFirebase,
  useAppLife,
  useReady,
} from 'hooks'
import {
  CustomDropdownAlert,
  CustomModal,
  Navigation,
} from 'components'
import defaults from 'utils/defaults'
import references from 'utils/references'
import {
  determineNavigationTheme,
} from 'utils/navigation'

const StartUpLayer = () => {
  references.reduxDispatch = useDispatch()

  useFirebase()
  useLocaleConfig()
  useReadToken()
  useReceiveFirebaseMessage()
  useAppLife()
  useStatusBar()
  useTroubleshootNetwork()
  useReady()

  return (
    <>
      <Navigation />
      <CustomDropdownAlert dropDownInactiveBarColor={determineNavigationTheme} />
      <CustomModal ref={defaults.modal} />
    </>
  )
}

export default StartUpLayer
