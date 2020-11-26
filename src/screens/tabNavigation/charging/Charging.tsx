import React, {
  ReactElement,
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
import { ScreenPropsWithNavigation } from 'allTypes'
import useCharging from './useCharging'
import { ChargingView } from './components'
import RenderTabBar from './components/RenderTabBar'

const Charging = ({ navigation }: ScreenPropsWithNavigation): ReactElement => {
  const { chargingState } = useSelector(selectChargingProcess)
  const {
    changeActiveTab,
    activeTab,
    ...hook
  } = useCharging(navigation)

  const renderScene = useCallback(
    (props: any): ReactElement => (
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
      onIndexChange={changeActiveTab}
      lazy
      renderTabBar={(props) => (
        <RenderTabBar
          hook={hook}
          changeActiveTab={changeActiveTab}
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
    [navigation, chargingState, hook, activeTab, changeActiveTab],
  )
}

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

export default Charging
