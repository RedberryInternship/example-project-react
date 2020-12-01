import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useStartUp from 'hooks/startUp'
import { StatusBar } from 'react-native'
import { CustomModal } from 'components'
import Defaults from 'utils/defaults'
import CustomDropdownAlert from 'components/CustomDropdownAlert'
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
          token: Defaults.token,
          chargingState: state.chargingState,
        }}
        theme="dark"
        onNavigationStateChange={() => {
          StatusBar.setBarStyle(determineNavigationTheme(), true)
        }}
      />

      <CustomDropdownAlert dropDownInactiveBarColor={determineNavigationTheme} />
      <CustomModal ref={Defaults.modal} />
    </>
  )
}

export default StartUpLayer
