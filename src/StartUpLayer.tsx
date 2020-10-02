import React, { useContext, useMemo, useState } from 'react'
import useStartUp from 'hooks/startUp'
import { StatusBar } from 'react-native'
import Navigation from '../src/navigation'
import { CustomModal } from 'components'
import Defaults from 'utils/defaults'
import CustomDropdownAlert from 'components/CustomDropdownAlert'
import ChargersContext from 'hooks/contexts/charger'

const StartUpLayer = () => {
  const { setNavigationTopLevelElement, dropDownInactiveBarColor } = useStartUp()

  const { state } = useContext(ChargersContext)

  return (
    <>
      <Navigation
        ref={(ref) => setNavigationTopLevelElement(ref)}
        screenProps={{
          token: Defaults.token,
          chargingState: state.chargingState,
        }}
        theme={'dark'}
        onNavigationStateChange={(_, state) => {
          StatusBar.setBarStyle(dropDownInactiveBarColor(), true)
        }}
      />

      <CustomDropdownAlert dropDownInactiveBarColor={dropDownInactiveBarColor} />
      <CustomModal ref={Defaults.modal} />
    </>
  )
}

export default StartUpLayer
