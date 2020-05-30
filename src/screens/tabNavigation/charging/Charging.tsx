import React, {ReactElement} from 'react'
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native'
import {TabView} from 'react-native-tab-view'
import Animated from 'react-native-reanimated'

import {ScreenPropsWithNavigation} from 'allTypes'

import {Colors} from 'utils'
import {BaseHeader} from 'components'
import useCharging from './useCharging'
import {ChargingView} from './components'

const Charging = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const {changeActiveTab, activeTab, chargingState, ...hook} = useCharging(
    navigation,
  )

  const renderScene = (props: any): ReactElement => {
    return (
      <ChargingView
        hook={hook}
        chargingState={props.route}
        key={props.route.start_charging_time}
      />
    )
  }

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map(
      (_: any, i: number) => i,
    )

    return (
      <Animated.View style={styles.tabBar} key={2}>
        {props.navigationState.routes.map((route: any, i: number) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex: number) =>
                  inputIndex === i ? 255 : 155,
                ),
                extrapolate: Animated.Extrapolate.CLAMP,
              }),
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex: number) =>
                  inputIndex === i ? 255 : 155,
                ),
                extrapolate: Animated.Extrapolate.CLAMP,
              }),
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex: number) =>
                  inputIndex === i ? 255 : 155,
                ),
                extrapolate: Animated.Extrapolate.CLAMP,
              }),
            ),
          )
          const backgroundColor = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex: number) =>
                  inputIndex === i ? 1 : 17,
                ),
                extrapolate: Animated.Extrapolate.CLAMP,
              }),
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex: number) =>
                  inputIndex === i ? 154 : 34,
                ),
                extrapolate: Animated.Extrapolate.CLAMP,
              }),
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex: number) =>
                  inputIndex === i ? 240 : 45,
                ),
                extrapolate: Animated.Extrapolate.CLAMP,
              }),
            ),
          )

          return (
            <Animated.View
              key={i}
              style={[
                styles.tabItem,
                {
                  borderRightWidth:
                    props.navigationState.routes.length - 1 !== i ? 1 : 0,
                  backgroundColor,
                },
              ]}
            >
              <TouchableOpacity onPress={() => changeActiveTab(i)}>
                <Animated.Text style={{color}}>
                  {hook.t('chargerString')} {route.charger_code}
                </Animated.Text>
              </TouchableOpacity>
            </Animated.View>
          )
        })}
      </Animated.View>
    )
  }

  return (
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
          renderTabBar={renderTabBar}
          initialLayout={Dimensions.get('window')}
        />
      ) : null}
    </View>
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
