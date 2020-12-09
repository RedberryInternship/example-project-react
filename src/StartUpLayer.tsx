import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useStartUp from 'hooks/startUp'
import { StatusBar } from 'react-native'
import { CustomModal, CustomDropdownAlert } from 'components'
import defaults from 'utils/defaults'
import { selectChargingProcess } from 'state/selectors'
import references from 'utils/references'
import { setNavigationReference, determineNavigationTheme } from 'helpers/navigation'
import Navigation from '../src/navigation'

const StartUpLayer = () => {
  references.reduxDispatch = useDispatch()
  useStartUp()
  const state = useSelector(selectChargingProcess)

  return (
    <>
      <Navigation
        ref={setNavigationReference}
        screenProps={{
          token: defaults.token,
          chargingState: state.chargingState,
        }}
        theme="dark"
        onNavigationStateChange={() => {
          StatusBar.setBarStyle(determineNavigationTheme(), true)
        }}
      />

      <CustomDropdownAlert dropDownInactiveBarColor={determineNavigationTheme} />
      <CustomModal ref={defaults.modal} />
    </>
  )
}

export default StartUpLayer
