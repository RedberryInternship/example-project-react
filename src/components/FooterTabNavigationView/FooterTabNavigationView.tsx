import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import { TabNavigationButtons } from 'components'
import { determineTimePeriod } from 'utils/map'
import { isAuthenticated } from 'helpers/user'
import images from 'assets/images'
import { FCWithNavigation } from 'types'
import { zoomOut } from './config'

const FooterTabNavigator: FCWithNavigation = (props) => {
  const { navigation } = props
  const currentRouteName = navigation.state.routes[navigation.state.index].key
  const insets = useSafeAreaInsets()

  const navigate = (name: string): void => {
    if (name === 'drawer') {
      return navigation.openDrawer()
    }
    props.navigation.navigate(name, { mode: null })
  }

  if (currentRouteName !== 'Home') {
    StatusBar.setBarStyle('light-content')
  } else {
    StatusBar.setBarStyle(
      determineTimePeriod() ? 'dark-content' : 'light-content',
    )
  }

  return (
    <View
      style={[
        styles.bottomTabContainer,
        { paddingBottom: insets.bottom, height: 65 + insets.bottom },
      ]}
    >
      <TabNavigationButtons
        active={currentRouteName === 'Home'}
        navigate={() => {
          props.navigation.setParams({})
          navigate('Home')
        }}
        image={images.mapPin}
      />
      <TabNavigationButtons
        active={
          currentRouteName === 'ChargerStack'
          || currentRouteName === 'NotAuthorized'
        }
        navigate={navigate.bind(
          FooterTabNavigator,
          isAuthenticated() ? 'ChargerStack' : 'NotAuthorized',
        )}
        image={images.chargeWithCode}
      />
      {props.screenProps.chargingState.length > 0 && isAuthenticated() && (
        <Animatable.View
          animation={zoomOut}
          iterationCount="infinite"
          duration={1500}
          useNativeDriver
          delay={2000}
          easing="ease-in-out-cubic"
        >
          <TabNavigationButtons
            navigate={navigate.bind(FooterTabNavigator, 'Charging')}
            image={images.charge}
            active={currentRouteName === 'Charging'}
          />
        </Animatable.View>
      )}

      {isAuthenticated() && (
        <TabNavigationButtons
          navigate={navigate.bind(FooterTabNavigator, 'Favorites')}
          image={images.favorite}
          active={currentRouteName === 'Favorites'}
        />
      )}
      <TabNavigationButtons
        navigate={navigate.bind(FooterTabNavigator, 'drawer')}
        image={images.menu}
        active={currentRouteName === 'drawer'}
      />
    </View>
  )
}
export default FooterTabNavigator

const styles = StyleSheet.create({
  bottomTabContainer: {
    backgroundColor: '#111314',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})
