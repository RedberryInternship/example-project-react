import React, {ReactElement, useMemo, useCallback} from 'react'
import {StyleSheet, View, Dimensions} from 'react-native'
import {TabView} from 'react-native-tab-view'

import {ScreenPropsWithNavigation} from 'allTypes'

import {Colors} from 'utils'
import {BaseHeader} from 'components'
import useCharging from './useCharging'
import {ChargingView} from './components'
import RenderTabBar from './components/RenderTabBar'

const Charging = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const {changeActiveTab, activeTab, chargingState, ...hook} = useCharging(
    navigation,
  )

  const renderScene = useCallback(
    (props: any): ReactElement => {
      return (
        <ChargingView
          hook={hook}
          chargingState={props.route}
          key={props.route.start_charging_time}
        />
      )
    },
    [hook],
  )

  return useMemo(
    () => (
      <View style={[styles.container]}>
        <BaseHeader
          onPressLeft={navigation.navigate.bind(Charging, 'ChargerWithCode')}
          title={'charging.charge'}
        />
        {chargingState.length === 1 ? (
          <ChargingView
            hook={hook}
            chargingState={chargingState[0]}
            singleCharger={true}
          />
        ) : chargingState.length !== 0 && chargingState ? (
          <TabView
            navigationState={{
              index: activeTab,
              routes: (chargingState ?? []) as any,
            }}
            renderScene={renderScene}
            onIndexChange={changeActiveTab}
            lazy={true}
            renderTabBar={(props) => (
              <RenderTabBar
                hook={hook}
                changeActiveTab={changeActiveTab}
                {...props}
              />
            )}
            initialLayout={Dimensions.get('window')}
          />
        ) : null}
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
