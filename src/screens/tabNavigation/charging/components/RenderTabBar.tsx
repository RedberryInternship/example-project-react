import Animated from 'react-native-reanimated'
import React, {useMemo} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Colors} from 'utils'

const RenderTabBar = ({hook, changeActiveTab, ...props}: any) => {
  const inputRange = props.navigationState.routes.map((_: any, i: number) => i)

  return useMemo(
    () => (
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
    ),
    [hook, props, changeActiveTab],
  )
}

export default RenderTabBar
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
