import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { CustomModal, CustomDropdownAlert } from 'components'
import defaults from 'utils/defaults'
import { selectChargingProcess } from 'state/selectors'
import references from 'utils/references'
import {
  determineNavigationTheme,
  onNavigationStateChange,
  setNavigationReference,
} from 'utils/navigation'
import Navigation from '../src/navigation'

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

  const { chargingState } = useSelector(selectChargingProcess)
  const { token } = defaults
  const screenProps = { chargingState, token }

  return (
    <>
      <Navigation
        ref={setNavigationReference}
        screenProps={screenProps}
        theme="dark"
        onNavigationStateChange={onNavigationStateChange}
      />
      <CustomDropdownAlert dropDownInactiveBarColor={determineNavigationTheme} />
      <CustomModal ref={defaults.modal} />
    </>
  )
}

export default StartUpLayer
