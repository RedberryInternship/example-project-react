import React, {
  useCallback,
  useMemo,
} from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { selectChargingProcess } from 'state/selectors'
import { TabView } from 'react-native-tab-view'
import { Colors } from 'utils'
import { BaseHeader } from 'components'
import { FCWithNavigation } from 'types'
import useCharging from './useCharging'
import { ChargingView } from './components'
import RenderTabBar from './components/RenderTabBar'

const Charging: FCWithNavigation = ({ navigation }) => {
  const { chargingState } = useSelector(selectChargingProcess)
  const {
    setActiveTab,
    activeTab,
    ...hook
  } = useCharging(navigation)

  const renderScene = useCallback(
    (props: any) => (
      <ChargingView
        hook={hook}
        chargingState={props.route}
        key={props.route.start_charging_time}
      />
    ),
    [hook],
  )

  const oneChargingProcess = (
    <ChargingView
      hook={hook}
      chargingState={chargingState[0]}
      singleCharger
    />
  )

  const twoChargingProcesses = (
    <TabView
      navigationState={{
        index: activeTab,
        routes: (chargingState ?? []) as any,
      }}
      renderScene={renderScene}
      onIndexChange={setActiveTab}
      lazy
      renderTabBar={(props) => (
        <RenderTabBar
          hook={hook}
          setActiveTab={setActiveTab}
          {...props}
        />
      )}
      initialLayout={Dimensions.get('window')}
    />
  )

  return useMemo(
    () => (
      <View style={[styles.container]}>
        <BaseHeader
          onPressLeft={navigation.navigate.bind(Charging, 'ChargerWithCode')}
          title="charging.charge"
        />
        {chargingState.length === 1 && oneChargingProcess}
        {chargingState.length === 2 && twoChargingProcesses}
      </View>
    ),
    [navigation, chargingState, hook, activeTab, setActiveTab],
  )
}

export default Charging

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryBackground,
  },
  tabBar: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.primaryBlue,
    borderRadius: 4,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0,
    borderColor: Colors.primaryBlue,
    height: 28,
    justifyContent: 'center',
  },
})
