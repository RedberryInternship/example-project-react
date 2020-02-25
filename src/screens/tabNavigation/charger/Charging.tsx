import React, {useState, ReactElement} from 'react'
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native'
import {BaseHeader, ChargingView} from 'components'
import {Colors} from 'utils'
import {TabView} from 'react-native-tab-view'
import Animated from 'react-native-reanimated'
import {useChargingHook} from 'hooks'
import {ScreenPropsWithNavigation} from 'allTypes'

const Charging = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const hook = useChargingHook(navigation)

  const [routes] = useState(navigation.getParam('tabsArray', ['']))

  const renderScene = ({route}: any): ReactElement => {
    return <ChargingView hook={hook} routeKey={route.key} />
  }

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map(
      (_: any, i: number) => i,
    )

    return (
      <Animated.View style={styles.tabBar}>
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
              ]}>
              <TouchableOpacity onPress={() => hook.changeActiveTab(i)}>
                <Animated.Text style={{color}}>{route.title}</Animated.Text>
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
      {routes.length === 1 ? (
        <ChargingView hook={hook} />
      ) : (
        <TabView
          navigationState={{index: hook.activeTab, routes}}
          renderScene={renderScene}
          onIndexChange={hook.changeActiveTab}
          lazy={true}
          renderTabBar={renderTabBar}
          initialLayout={Dimensions.get('window')}
        />
      )}
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
